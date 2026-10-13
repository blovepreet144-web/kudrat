@echo off
title Kudrat Kaur Portfolio - Local Server (Port 8080)
color 0B
cls

echo ======================================================================
echo       KUDRAT KAUR PORTFOLIO - LOCALHOST SERVER (PORT 8080)
echo ======================================================================
echo.

set "PATH=%PATH%;C:\Program Files\nodejs;C:\Program Files (x86)\nodejs;%APPDATA%\npm;%USERPROFILE%\.bun\bin;%LOCALAPPDATA%\Programs\nodejs;%NVM_HOME%;%NVM_SYMLINK%;C:\Program Files\nvm;%APPDATA%\nvm;%LOCALAPPDATA%\Volta\bin;C:\ProgramData\chocolatey\bin;%LOCALAPPDATA%\Programs\pnpm"

cd /d "%~dp0"

echo [LOG] Started at %DATE% %TIME% > "%~dp0server-log.txt"
echo [LOG] Working directory: %CD% >> "%~dp0server-log.txt"

if not exist node_modules (
    echo [1/2] Installing required project packages...
    echo [LOG] Installing dependencies... >> "%~dp0server-log.txt"
    call bun --version >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [INFO] Bun detected! Installing with bun...
        call bun install
    ) else (
        echo [INFO] Installing dependencies with npm...
        call npm install --no-audit --no-fund
    )
)

echo.
echo ======================================================================
echo [2/2] Starting Local Server at: http://localhost:8080
echo Opening browser automatically...
echo *** KEEP THIS WINDOW OPEN WHILE VIEWING THE WEBSITE! ***
echo ======================================================================
echo.

start "" "http://localhost:8080"

call npm run dev
if %ERRORLEVEL% NEQ 0 (
    call bun run dev
)

pause
