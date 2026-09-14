import importlib.util
import io
import json
import os
from pathlib import Path
import unittest
from unittest.mock import patch
from urllib.error import HTTPError, URLError

spec = importlib.util.spec_from_file_location(
    "cloudflare", Path(__file__).resolve().parents[1] / "purge-cloudflare.py"
)
cloudflare = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cloudflare)


class CloudflareTests(unittest.TestCase):
    def setUp(self):
        env = patch.dict(os.environ, {
            "CLOUDFLARE_API_TOKEN": "test-token",
            "CLOUDFLARE_ZONE_ID": "a" * 32,
            "CLOUDFLARE_HOSTNAME": "docs.example.com",
        }, clear=True)
        env.start()
        self.addCleanup(env.stop)
        sleep = patch.object(cloudflare.time, "sleep")
        self.sleep = sleep.start()
        self.addCleanup(sleep.stop)

    @patch.object(cloudflare.urllib.request, "urlopen")
    def test_only_intended_hostname_is_purged(self, call):
        call.return_value = io.BytesIO(b'{"success":true}')
        cloudflare.purge()
        request = call.call_args.args[0]
        self.assertEqual(json.loads(request.data), {"hosts": ["docs.example.com"]})
        self.assertEqual(request.get_method(), "POST")
        self.assertEqual(request.full_url, 'https://api.cloudflare.com/client/v4/zones/' + 'a'*32 + '/purge_cache')

    @patch.object(cloudflare.urllib.request, "urlopen")
    def test_transient_error_then_success(self, call):
        call.side_effect = [HTTPError('url', 429, '', {}, None), io.BytesIO(b'{"success":true}')]
        cloudflare.purge()
        self.assertEqual(call.call_count, 2)

    @patch.object(cloudflare.urllib.request, "urlopen", side_effect=URLError('offline'))
    def test_network_retries_are_bounded(self, call):
        with self.assertRaisesRegex(RuntimeError, 'three network attempts'):
            cloudflare.purge()
        self.assertEqual(call.call_count, 3)
        self.assertEqual(self.sleep.call_count, 2)

    @patch.object(cloudflare.urllib.request, "urlopen")
    def test_auth_failure_is_not_retried(self, call):
        call.side_effect = HTTPError('url', 403, '', {}, None)
        with self.assertRaisesRegex(RuntimeError, 'HTTP 403'):
            cloudflare.purge()
        self.assertEqual(call.call_count, 1)

    @patch.object(cloudflare.urllib.request, "urlopen")
    def test_unsuccessful_api_body(self, call):
        call.return_value = io.BytesIO(b'{"success":false}')
        with self.assertRaisesRegex(RuntimeError, 'did not confirm'):
            cloudflare.purge()

    @patch.object(cloudflare.urllib.request, "urlopen")
    def test_invalid_hostname_never_calls_api(self, call):
        for hostname in ["", "https://docs.example.com", "*.example.com", "docs.example.com/path", "a\nb.com", "-docs.example.com"]:
            with self.subTest(hostname=hostname):
                os.environ['CLOUDFLARE_HOSTNAME'] = hostname
                with self.assertRaises(RuntimeError):
                    cloudflare.purge()
        call.assert_not_called()

    @patch.object(cloudflare.urllib.request, "urlopen")
    def test_missing_config_never_calls_api(self, call):
        del os.environ['CLOUDFLARE_API_TOKEN']
        with self.assertRaises(RuntimeError):
            cloudflare.purge()
        call.assert_not_called()
