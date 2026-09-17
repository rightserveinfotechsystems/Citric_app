#!/usr/bin/env bash
#
# EAS Build lifecycle hook: stamps the iOS buildNumber / marketing version
# from app.json (or IOS_BUILD_NUMBER / IOS_MARKETING_VERSION env overrides)
# onto the Xcode project BEFORE archiving. Wired via package.json:
#   "eas-build-post-install": "bash scripts/eas-ios-set-version.sh"
#
# Rationale: this project is BARE (android/ and ios/ are source of truth and
# prebuild is intentionally disabled), so expo.android.versionCode /
# expo.ios.buildNumber are not applied automatically. This hook makes app.json
# the authoritative version source while remaining fully overridable per build.
set -euo pipefail

if [ "${EAS_BUILD_PLATFORM:-}" != "ios" ]; then
  echo "[eas-ios-set-version] EAS_BUILD_PLATFORM=${EAS_BUILD_PLATFORM:-unset} — skipping (iOS-only hook)."
  exit 0
fi

cd "$(dirname "$0")/../ios"

BUILD_NUMBER="${IOS_BUILD_NUMBER:-$(node -p "require('../app.json').expo.ios.buildNumber")}"
MARKETING_VERSION="${IOS_MARKETING_VERSION:-$(node -p "require('../app.json').expo.version")}"

echo "[eas-ios-set-version] Setting buildNumber=${BUILD_NUMBER}, marketingVersion=${MARKETING_VERSION}"

# VERSIONING_SYSTEM=apple-generic is already set in project.pbxproj (verified).
xcrun agvtool new-version -all "${BUILD_NUMBER}"
xcrun agvtool new-marketing-version "${MARKETING_VERSION}"

echo "[eas-ios-set-version] Done. CURRENT_PROJECT_VERSION / MARKETING_VERSION updated for all targets."
