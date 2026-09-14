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
        }
        for name, body in {
            "ssh": 'echo ssh >> "$TEST_CALLS"\ncat >/dev/null\n',
            "rsync": 'echo rsync >> "$TEST_CALLS"\nexit 23\n',
        }.items():
            path = self.bin / name
            path.write_text("#!/bin/sh\n" + body)
            path.chmod(0o755)

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
        for name in ["index.html", "404.html", "docs/index.html", "guide/modlog/index.html"]:
            path = self.root / "dist" / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text("synthetic page")
        (self.root / "dist/assets").mkdir()
        result = self.run_script()
        self.assertEqual(result.returncode, 23, result.stderr)
        self.assertEqual(self.log.read_text().splitlines(), ["ssh", "rsync"])
