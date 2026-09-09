@echo off
title InterviewAI - Full Stack Launcher
echo ========================================================
echo         Starting InterviewAI Full-Stack Platform        
echo ========================================================

:: Add node to PATH if needed
set "PATH=C:\Users\subha\nodejs;C:\Program Files\Git\cmd;%PATH%"

:: Start Express Backend in a separate window
echo [1/3] Launching Express Backend on port 5000...
start "InterviewAI Server" cmd /k "cd /d %~dp0server && npm start"

:: Wait 2 seconds for server to initialize
timeout /t 2 /nobreak >nul

:: Start Vite Frontend in a separate window
echo [2/3] Launching Vite Frontend on port 5173...
start "InterviewAI Client" cmd /k "cd /d %~dp0client && npm run dev"

:: Wait 2 seconds for Vite to initialize
timeout /t 2 /nobreak >nul

:: Open default browser
echo [3/3] Opening http://localhost:5173 in your default browser...
start http://localhost:5173

echo.
echo ========================================================
echo   InterviewAI is running!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo   Demo Login: demo@interviewai.dev / password123
echo ========================================================
echo You can minimize this window or close it when done.
pause
