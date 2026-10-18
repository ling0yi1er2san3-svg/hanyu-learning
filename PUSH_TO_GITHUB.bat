@echo off
setlocal
cd /d "%~dp0"
echo ============================================================
echo HANYU LEARNING V2 - GITHUB DEPLOY
echo Target: ling0yi1er2san3-svg/hanyu-learning
echo ============================================================
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\push-to-github.ps1"
set "RC=%ERRORLEVEL%"
echo.
if not "%RC%"=="0" (
  echo DEPLOY STOPPED / FAILED. Error code: %RC%
  echo Read GITHUB_DEPLOY_README.md for details.
) else (
  echo DEPLOY COMMANDS COMPLETED SUCCESSFULLY.
)
echo.
pause
exit /b %RC%
