@echo off
title Block Bloom Emulator Launcher
echo ========================================================
echo   Starting Android Emulator (bloomtest)
echo   Hardware Acceleration: GPU Host
echo ========================================================
set "ANDROID_SDK_ROOT=D:\DevTools\Android\Sdk"
set "PATH=%ANDROID_SDK_ROOT%\platform-tools;%ANDROID_SDK_ROOT%\emulator;%PATH%"

echo [1/3] Launching emulator GUI window...
start "" "%ANDROID_SDK_ROOT%\emulator\emulator.exe" -avd bloomtest -gpu host -accel auto

echo [2/3] Waiting for Android device to boot...
adb wait-for-device

echo [3/3] Installing latest Block Bloom debug build...
adb install -r "D:\DevTools\BlockBloom-oct9\app\build\outputs\apk\debug\app-debug.apk"

echo.
echo Launching Block Bloom...
adb shell am start --user 0 -n com.aweagle.blockbloom.debug/com.aweagle.blockbloom.MainActivity

echo.
echo ========================================================
echo   Block Bloom is now live on your emulator!
echo   You can close this command window anytime.
echo ========================================================
timeout /t 10
