@echo off
echo ========================================================
echo Starting n8n locally...
echo ========================================================
echo.
echo n8n is downloading and starting. This may take a minute.
echo Please do not close this window!
echo.
echo Once started, open your browser to: http://localhost:5678
echo ========================================================
echo.

cmd.exe /c "npx n8n"
pause
