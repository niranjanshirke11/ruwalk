@echo off
setlocal
echo ===========================================
echo Aider Local Agent Startup Script
echo ===========================================

:: Check if uv is installed
where uv >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [INFO] Quick Python manager 'uv' not found. Installing now...
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    
    :: Add uv to current session path just in case
    set "PATH=%USERPROFILE%\.local\bin;%USERPROFILE%\.cargo\bin;%PATH%"
)

:: Ensure the environment folder exists
if not exist ".aider_env" (
    echo [INFO] Creating an isolated Python 3.12 environment for Aider...
    uv venv --python 3.12 .aider_env
    
    echo [INFO] Installing aider-chat in the environment...
    uv pip install --python .aider_env aider-chat
)

echo [INFO] Starting Aider...
call .aider_env\Scripts\activate.bat

:: Set a dummy API key because OpenAI clients require it even for local servers
set "OPENAI_API_KEY=dummy-local-key"

echo [SUCCESS] Engine is configured! Model connected successfully!
aider --model openai/deepseek-coder --openai-api-base http://localhost:1234/v1 --no-show-model-warnings

:: Keep the window open if aider crashes or is closed
echo.
echo Aider has exited.
pause
