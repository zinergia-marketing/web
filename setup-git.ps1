# Script de configuración inicial de Git y GitHub
# Ejecuta este script después de instalar Git

Write-Host "🚀 Configuración de Git para Zinergia Web" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✓ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git no está instalado" -ForegroundColor Red
    Write-Host "Por favor instala Git desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📝 Configuración de Git..." -ForegroundColor Cyan

# Solicitar información del usuario
$userName = Read-Host "Ingresa tu nombre (para commits)"
$userEmail = Read-Host "Ingresa tu email (para commits)"
$githubUser = Read-Host "Ingresa tu usuario de GitHub"
$repoName = Read-Host "Ingresa el nombre del repositorio en GitHub (ej: zinergia-web)"

# Configurar Git
git config --global user.name "$userName"
git config --global user.email "$userEmail"

Write-Host ""
Write-Host "✓ Git configurado" -ForegroundColor Green

# Inicializar repositorio si no existe
if (-not (Test-Path ".git")) {
    Write-Host ""
    Write-Host "📦 Inicializando repositorio Git..." -ForegroundColor Cyan
    git init
    git add .
    git commit -m "Initial commit - Zinergia Web"
    Write-Host "✓ Repositorio inicializado" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "✓ Repositorio Git ya existe" -ForegroundColor Green
}

# Agregar remote de GitHub
Write-Host ""
Write-Host "🔗 Conectando con GitHub..." -ForegroundColor Cyan
$remoteUrl = "https://github.com/$githubUser/$repoName.git"

# Verificar si el remote ya existe
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠ Remote 'origin' ya existe: $existingRemote" -ForegroundColor Yellow
    $overwrite = Read-Host "¿Deseas reemplazarlo? (s/n)"
    if ($overwrite -eq "s") {
        git remote set-url origin $remoteUrl
        Write-Host "✓ Remote actualizado" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "✓ Remote agregado: $remoteUrl" -ForegroundColor Green
}

# Cambiar a branch main
git branch -M main 2>$null

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "✅ Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Asegúrate de haber creado el repositorio en GitHub: $repoName" -ForegroundColor White
Write-Host "2. Ejecuta: git push -u origin main" -ForegroundColor White
Write-Host "3. Ve a https://vercel.com y conecta tu repositorio" -ForegroundColor White
Write-Host ""


