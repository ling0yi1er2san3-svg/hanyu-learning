@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\original-audio\repair-corrupted-lessons.ps1"
set "RC=%ERRORLEVEL%"
echo.
if "%RC%"=="0" (
  echo Repair xong. Co the chay PUSH_TO_GITHUB.bat ngay.
) else (
  echo Repair loi: %RC%
)
pause
exit /b %RC%
