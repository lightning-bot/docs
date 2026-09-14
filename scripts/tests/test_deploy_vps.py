import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).resolve().parents[1] / "deploy-vps.sh"


class UploadTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.bin = self.root / "bin"
        self.bin.mkdir()
        self.log = self.root / "calls"
        self.env = {
            **os.environ,
            "PATH": f"{self.bin}:{os.environ['PATH']}",
            "VPS_HOST": "vps.example.com",
            "VPS_USER": "deploy-lightning",
            "VPS_SSH_KEY": "synthetic-key",
            "VPS_KNOWN_HOSTS": "synthetic-host-key",
            "VPS_PATH": "/var/www/lightning-docs",
            "VPS_PORT": "22",
            "RELEASE_ID": "a" * 40 + "-123-1",
            "TEST_CALLS": str(self.log),
            "TEST_SSH_ARGS": str(self.root / "ssh-args"),
        }
        for name, body in {
            "ssh": 'echo ssh >> "$TEST_CALLS"\nprintf \'%s\\n\' "$@" >> "$TEST_SSH_ARGS"\ncat >/dev/null\n',
            "rsync": 'echo rsync >> "$TEST_CALLS"\nexit 23\n',
        }.items():
            path = self.bin / name
            path.write_text("#!/bin/sh\n" + body)
            path.chmod(0o755)

    def create_navigation(self):
        (self.root / "README.md").write_text("Welcome")
        (self.root / "logs.md").write_text("Logs")
        (self.root / "navigation.toml").write_text(
            '[Overview]\n[[Overview.pages]]\ntitle="Welcome"\nfile="README.md"\npath="/docs"\n'
            '[Policies]\n[[Policies.pages]]\ntitle="Logs"\nfile="logs.md"\npath="/docs/custom-logs"\n'
        )

    def create_build(self):
        self.create_navigation()
        for name in ["index.html", "404.html", "docs/index.html", "docs/custom-logs/index.html"]:
            path = self.root / "dist" / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("synthetic page")
        (self.root / "dist/assets").mkdir()

    def run_script(self):
        return subprocess.run(
            ["bash", str(SCRIPT)], cwd=self.root, env=self.env,
            capture_output=True, text=True, timeout=10,
        )

    def test_root_rejected_before_connection(self):
        self.env["VPS_USER"] = "root"
        result = self.run_script()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("non-root", result.stderr)
        self.assertFalse(self.log.exists())

    def test_missing_build_rejected_before_connection(self):
        result = self.run_script()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Missing or empty dist/index.html", result.stderr)
        self.assertFalse(self.log.exists())

    def test_failed_upload_never_attempts_activation(self):
        self.create_build()
        result = self.run_script()
        self.assertEqual(result.returncode, 23, result.stderr)
        self.assertEqual(self.log.read_text().splitlines(), ["ssh", "rsync"])

    def test_missing_configured_page_rejected_before_connection(self):
        self.create_build()
        (self.root / "dist/docs/custom-logs/index.html").unlink()
        result = self.run_script()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Missing or empty dist/docs/custom-logs/index.html", result.stderr)
        self.assertFalse(self.log.exists())

    def test_invalid_navigation_rejected_before_connection(self):
        self.create_build()
        (self.root / "navigation.toml").write_text('broken = "unterminated')
        result = self.run_script()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Unable to validate navigation.toml", result.stderr)
        self.assertFalse(self.log.exists())

    def test_custom_routes_passed_to_remote_activation(self):
        self.create_build()
        (self.bin / "rsync").write_text('#!/bin/sh\necho rsync >> "$TEST_CALLS"\n')
        result = self.run_script()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.log.read_text().splitlines(), ["ssh", "rsync", "ssh"])
        arguments = (self.root / "ssh-args").read_text()
        self.assertIn("'docs/custom-logs/index.html'", arguments)
        self.assertNotIn("guide/modlog", arguments)

    def test_remote_missing_configured_page_preserves_current_release(self):
        self.create_build()
        base = self.root / "remote"
        self.env["VPS_PATH"] = str(base)
        release = base / "releases" / self.env["RELEASE_ID"]
        for name in ["index.html", "404.html", "docs/index.html"]:
            target = release / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text("synthetic page")
        (release / "assets").mkdir()
        (base / "current").symlink_to("releases/previous")
        (self.bin / "rsync").write_text('#!/bin/sh\necho rsync >> "$TEST_CALLS"\n')
        (self.bin / "ssh").write_text(
            '#!/bin/sh\necho ssh >> "$TEST_CALLS"\n'
            'for argument do command=$argument; done\n'
            'case "$command" in *custom-logs*) eval "$command";; *) cat >/dev/null;; esac\n'
        )
        result = self.run_script()
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(os.readlink(base / "current"), "releases/previous")
        self.assertEqual(self.log.read_text().splitlines(), ["ssh", "rsync", "ssh"])
