@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
echo ============================================================
echo HANYU LEARNING V2 - XAC MINH AUDIO GOC Q5-Q6 (Q1-Q4 DA MAP SAN)
echo ============================================================
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\original-audio\import-original-audio.ps1"
set "RC=%ERRORLEVEL%"
echo.
if not "%RC%"=="0" (
  echo Mapper dung voi ma loi %RC%.
) else (
  echo Mapper da ket thuc.
)
echo.
pause
exit /b %RC%
