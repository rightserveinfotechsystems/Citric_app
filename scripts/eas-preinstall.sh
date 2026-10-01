#!/bin/bash
# eas-build-pre-install hook: normalize line endings of shell-executed files.
# Windows working copies may carry CRLF (stale checkout) even though the repo
# enforces LF via .gitattributes. CRLF breaks bash during the Xcode build
# (".xcode.env: line N: command not found"). Strip it on the cloud machine.
set -e
for f in ios/.xcode.env ios/Podfile android/gradlew; do
  if [ -f "$f" ] && grep -q "$(printf '\r')" "$f" 2>/dev/null; then
    echo "eas-preinstall: stripping CR from $f"
    sed -i.bak 's/\r$//' "$f"
    rm -f "$f.bak"
  fi
done
echo "eas-preinstall: line-ending check done"
