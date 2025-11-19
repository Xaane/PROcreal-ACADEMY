@echo off
chcp 65001 >nul

:: Définir le chemin de base
set "BASE_DIR=%USERPROFILE%\Documents\Business\ProCréal Website\PROcreal-ACADEMY-main 2"

:: Vérifier si le dossier existe
if not exist "%BASE_DIR%" (
    echo Le dossier n'existe pas : %BASE_DIR%
    pause
    exit /b
)

cd /d "%BASE_DIR%"

:: Créer les dossiers
if not exist "css" mkdir css
if not exist "js" mkdir js
if not exist "pages\formations" mkdir "pages\formations"

:: Déplacer les fichiers
move "styles.css" "css\styles.css" 2>nul
move "script.js" "js\script.js" 2>nul
move "formation-autocad.html" "pages\formations\autocad.html" 2>nul
move "formation-revit.html" "pages\formations\revit.html" 2>nul
move "formation-robot.html" "pages\formations\robot.html" 2>nul

echo Organisation terminée.
pause
