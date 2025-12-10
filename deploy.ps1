# Script para hacer deploy rápido
# Usa este script después de hacer cambios

param(
    [switch]$vercel,
    [switch]$git
)

Write-Host "🚀 Deploy de Zinergia Web" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

if ($git) {
    Write-Host "📤 Deploy con Git + Vercel (automático)" -ForegroundColor Cyan
    Write-Host ""
    
    # Verificar cambios
    $status = git status --porcelain
    if (-not $status) {
        Write-Host "⚠ No hay cambios para commitear" -ForegroundColor Yellow
        exit 0
    }
    
    # Mostrar cambios
    Write-Host "Cambios detectados:" -ForegroundColor Yellow
    git status --short
    Write-Host ""
    
    # Solicitar mensaje de commit
    $message = Read-Host "Ingresa un mensaje para el commit"
    if (-not $message) {
        $message = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    
    # Hacer commit y push
    git add .
    git commit -m "$message"
    git push
    
    Write-Host ""
    Write-Host "✅ Cambios enviados a GitHub" -ForegroundColor Green
    Write-Host "⏳ Vercel desplegará automáticamente en 1-2 minutos..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🔗 Revisa el estado en: https://vercel.com/dashboard" -ForegroundColor White
    
} elseif ($vercel) {
    Write-Host "📤 Deploy directo con Vercel CLI" -ForegroundColor Cyan
    Write-Host ""
    
    # Verificar si Vercel CLI está instalado
    try {
        $vercelVersion = vercel --version
        Write-Host "✓ Vercel CLI encontrado: $vercelVersion" -ForegroundColor Green
    } catch {
        Write-Host "✗ Vercel CLI no está instalado" -ForegroundColor Red
        Write-Host "Instalando Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
    }
    
    Write-Host ""
    Write-Host "Desplegando..." -ForegroundColor Cyan
    vercel --prod
    
    Write-Host ""
    Write-Host "✅ Deploy completado!" -ForegroundColor Green
    
} else {
    Write-Host "Selecciona el método de deploy:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Git + Vercel (automático) - Recomendado" -ForegroundColor White
    Write-Host "2. Vercel CLI (directo)" -ForegroundColor White
    Write-Host ""
    $choice = Read-Host "Opción (1 o 2)"
    
    if ($choice -eq "1") {
        & $PSCommandPath -git
    } elseif ($choice -eq "2") {
        & $PSCommandPath -vercel
    } else {
        Write-Host "Opción inválida" -ForegroundColor Red
    }
}


