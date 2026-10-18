@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
echo ============================================================
echo HANYU LEARNING V2 - REPAIR DATA + MAP AUDIO GOC Q5-Q6
echo Q1-Q4: AUDIO GOC DA MAP SAN
echo ============================================================
echo.
echo [1/2] Sua JSON Q5-Q6 bi loi encoding tu mapper cu...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\original-audio\repair-corrupted-lessons.ps1"
if errorlevel 1 (
  echo.
  echo REPAIR THAT BAI. DUNG LAI DE BAO VE DU LIEU.
  pause
  exit /b 40
)
echo.
echo [2/2] Chay mapper Q5-Q6 moi...
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\original-audio\import-original-audio.ps1"
set "RC=%ERRORLEVEL%"
echo.
if not "%RC%"=="0" (
  echo Mapper dung voi ma loi %RC%.
) else (
  echo Mapper da ket thuc thanh cong.
  echo Bay gio chay PUSH_TO_GITHUB.bat.
)
echo.
pause
exit /b %RC%
