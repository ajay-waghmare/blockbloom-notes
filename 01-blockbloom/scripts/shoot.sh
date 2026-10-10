#!/usr/bin/env bash
# Capture a localised store screenshot set from the running emulator.
# Usage: shoot.sh <locale> <outdir>
set -u
export MSYS_NO_PATHCONV=1
PKG=com.aweagle.blockbloom.debug
LOC="$1"; OUT="$2"
mkdir -p "$OUT"

snap () { adb shell screencap -p "/sdcard/s.png" >/dev/null 2>&1; adb pull "/sdcard/s.png" "$OUT/$1.png" >/dev/null 2>&1; echo "    captured $1"; }
dump () { adb shell uiautomator dump /sdcard/d.xml >/dev/null 2>&1; adb pull /sdcard/d.xml "$OUT/d.xml" >/dev/null 2>&1; }
# tap an element by its visible text
tapText () {
  dump
  local b
  b=$(tr '>' '>\n' < "$OUT/d.xml" | grep -oE "text=\"$1\"[^>]*bounds=\"\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]\"" | grep -oE '\[[0-9]+,[0-9]+\]\[[0-9]+,[0-9]+\]' | head -1)
  [ -z "$b" ] && { echo "    (no element '$1')"; return 1; }
  local x y
  x=$(echo "$b" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\1 \3/' | awk '{print int(($1+$2)/2)}')
  y=$(echo "$b" | sed -E 's/\[([0-9]+),([0-9]+)\]\[([0-9]+),([0-9]+)\]/\2 \4/' | awk '{print int(($1+$2)/2)}')
  adb shell input tap "$x" "$y"; adb shell 'sleep 2'
}

echo "  --- $LOC ---"
adb shell am force-stop $PKG >/dev/null 2>&1
adb shell pm clear $PKG >/dev/null 2>&1
adb shell cmd locale set-app-locales $PKG --locales "$LOC" >/dev/null 2>&1
adb shell am start -n $PKG/com.aweagle.blockbloom.MainActivity >/dev/null 2>&1
adb shell 'sleep 9'

# 1. the coached first board — the new onboarding, the thing that changed
snap 01-board

# place a few blocks so the board is not empty
for i in 1 2 3 4 5 6; do
  adb shell input tap 192 2162 >/dev/null 2>&1
  adb shell input tap $((180 + i*110)) $((760 + (i%3)*130)) >/dev/null 2>&1
done
adb shell 'sleep 2'
snap 02-playing

# 2. home
adb shell input keyevent KEYCODE_BACK >/dev/null 2>&1; adb shell 'sleep 3'
adb shell input tap 540 1428 >/dev/null 2>&1; adb shell 'sleep 2'   # collect daily bonus if shown
snap 03-home

# 3. achievements (tile is below the fold)
adb shell input swipe 540 1800 540 700 300 >/dev/null 2>&1; adb shell 'sleep 2'
if tapText "$3"; then adb shell 'sleep 2'; snap 04-achievements; adb shell input keyevent KEYCODE_BACK >/dev/null 2>&1; adb shell 'sleep 2'; fi

# 4. shop
adb shell input swipe 540 1800 540 700 300 >/dev/null 2>&1; adb shell 'sleep 2'
if tapText "$4"; then adb shell 'sleep 2'; snap 05-shop; fi

rm -f "$OUT/d.xml"
ls -1 "$OUT" | sed 's/^/    /'
