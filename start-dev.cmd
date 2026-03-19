@echo off
setlocal
"%~dp0.tools\node-v16.20.2-win-x64\node.exe" "%~dp0node_modules\next\dist\bin\next" dev -p 3000
