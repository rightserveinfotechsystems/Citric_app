#!/usr/bin/env bash
#
# Verifies that a release artifact's signing certificate matches the live
# keystore BEFORE it reaches the stores. Run this on every production artifact.
#
# Usage:
#   ./scripts/verify-android-fingerprint.sh <path/to/app-release.aab|apk> <path/to/upload.keystore|jks> [keyAlias]
#
# Then confirm in Google Play Console:
#   Setup → App signing → compare "Upload key certificate" SHA-256 with the values printed here.
#   (If Play App Signing is NOT enrolled, compare against the "App signing key certificate".)
set -euo pipefail

AAB="${1:?Usage: $0 <artifact.aab|apk> <keystore> [alias]}"
KS="${2:?Usage: $0 <artifact.aab|apk> <keystore> [alias]}"
ALIAS="${3:-}"

echo "== 1) SHA-256 of the certificate that ACTUALLY signed the artifact =="
keytool -printcert -jarfile "${AAB}" | grep -iE "SHA256:" || true

echo
echo "== 2) SHA-256 of the certificate inside the keystore =="
if [ -n "${ALIAS}" ]; then
  keytool -list -v -keystore "${KS}" -alias "${ALIAS}" | grep -iE "SHA256:" || true
else
  keytool -list -v -keystore "${KS}" | grep -iE "SHA256:" || true
fi

echo
echo "== 3) Fingerprint EAS holds for this project =="
echo "   Cross-check at: https://expo.dev → your project → Credentials → Android → keystore fingerprint"
echo "   (CLI: npx eas credentials --platform android)"
echo
echo "PASS CRITERIA: values from (1) and (2) must be identical, and must match the"
echo "'Upload key certificate' SHA-256 shown in Google Play Console."
