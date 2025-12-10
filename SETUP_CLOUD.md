# Guía: Sincronización en la Nube con Deploy Automático

## 🎯 Objetivo
Trabajar desde Cursor (como lo haces actualmente) y que los cambios se reflejen automáticamente en la página online.

---

## ✅ OPCIÓN 1: Vercel + GitHub (RECOMENDADA)

### Ventajas:
- ✅ Deploy automático en cada cambio
- ✅ Gratis para proyectos personales
- ✅ Optimizado para Next.js
- ✅ Dominio personalizado incluido
- ✅ Historial de versiones
- ✅ Preview de cada cambio antes de publicar

### Paso a Paso:

#### 1. Instalar Git
1. Descarga Git desde: https://git-scm.com/download/win
2. Instala con las opciones por defecto
3. Reinicia Cursor después de instalar

#### 2. Crear cuenta en GitHub
1. Ve a https://github.com y crea una cuenta (gratis)
2. Verifica tu email

#### 3. Inicializar Git en tu proyecto
```bash
# En la terminal de Cursor (o PowerShell)
cd C:\Users\joser\Documents\Jose\Zinergia\web
git init
git add .
git commit -m "Initial commit"
```

#### 4. Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre: `zinergia-web` (o el que prefieras)
3. **NO marques** "Initialize with README"
4. Click en "Create repository"

#### 5. Conectar tu proyecto local con GitHub
```bash
# Reemplaza TU_USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/zinergia-web.git
git branch -M main
git push -u origin main
```

#### 6. Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Click en "Sign Up" y elige "Continue with GitHub"
3. Autoriza la conexión

#### 7. Conectar Vercel con tu repositorio
1. En Vercel, click en "Add New Project"
2. Selecciona tu repositorio `zinergia-web`
3. Vercel detectará automáticamente que es Next.js
4. Click en "Deploy"

#### 8. Configurar Variables de Entorno en Vercel
1. En el proyecto de Vercel, ve a "Settings" > "Environment Variables"
2. Agrega todas las variables de tu `.env.local`:
   - `NEXT_PUBLIC_BREVO_API_KEY`
   - `BREVO_LIST_ID`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_DOMAIN`

#### 9. ¡Listo! Flujo de trabajo:
```bash
# 1. Haces cambios en Cursor (como siempre)
# 2. Guardas los archivos
# 3. En la terminal:
git add .
git commit -m "Descripción de los cambios"
git push

# 4. Vercel automáticamente detecta el cambio y despliega
# 5. En 1-2 minutos tu página está actualizada online
```

---

## 🔄 OPCIÓN 2: Vercel CLI (Sin Git)

### Ventajas:
- ✅ No necesitas Git
- ✅ Deploy directo desde tu carpeta
- ✅ Sincronización manual cuando quieras

### Paso a Paso:

#### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

#### 2. Iniciar sesión en Vercel
```bash
vercel login
```

#### 3. Hacer el primer deploy
```bash
cd C:\Users\joser\Documents\Jose\Zinergia\web
vercel
```
- Sigue las instrucciones
- Elige las opciones por defecto

#### 4. Configurar variables de entorno
```bash
vercel env add NEXT_PUBLIC_BREVO_API_KEY
vercel env add BREVO_LIST_ID
vercel env add NEXT_PUBLIC_GA_ID
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER
vercel env add NEXT_PUBLIC_DOMAIN
```

#### 5. Para actualizar la página después de cambios:
```bash
# Cada vez que hagas cambios y quieras actualizar:
vercel --prod
```

#### 6. (Opcional) Modo watch para auto-deploy
Puedes crear un script que monitoree cambios:
```bash
# Instalar nodemon globalmente
npm install -g nodemon

# Crear script de watch (ver más abajo)
```

---

## 📁 OPCIÓN 3: OneDrive/Google Drive + Hosting

### Ventajas:
- ✅ Sincronización automática de archivos
- ✅ Familiar si ya usas estos servicios

### Desventajas:
- ⚠️ Requiere configuración adicional
- ⚠️ No es ideal para desarrollo web
- ⚠️ Puede tener problemas con node_modules

### Paso a Paso:

#### 1. Mover carpeta a OneDrive/Google Drive
1. Mueve la carpeta `web` a tu carpeta de OneDrive/Google Drive
2. Espera a que sincronice completamente

#### 2. Configurar hosting
- Opción A: Usar Vercel CLI (como Opción 2)
- Opción B: Usar Netlify Drop (arrastra y suelta)
- Opción C: Usar un servicio como Railway, Render, etc.

#### 3. Configurar auto-deploy
- Conecta el hosting a tu carpeta en la nube
- O usa scripts de sincronización

---

## 🚀 RECOMENDACIÓN FINAL

**Te recomiendo la OPCIÓN 1 (Vercel + GitHub)** porque:
1. Es la forma profesional de trabajar
2. Tienes historial de todos los cambios
3. Puedes volver atrás si algo sale mal
4. Deploy automático sin esfuerzo
5. Gratis y optimizado para Next.js

---

## 📝 Scripts Útiles

### Script para auto-deploy con Vercel CLI (Opción 2)
Crea un archivo `watch-deploy.ps1`:

```powershell
# watch-deploy.ps1
Write-Host "Monitoreando cambios..." -ForegroundColor Cyan
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "."
$watcher.Filter = "*.*"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    $path = $Event.SourceEventArgs.FullPath
    $changeType = $Event.SourceEventArgs.ChangeType
    if ($path -notmatch "node_modules|\.next|\.git") {
        Write-Host "Cambio detectado: $changeType en $path" -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        Write-Host "Desplegando..." -ForegroundColor Green
        vercel --prod
    }
}

Register-ObjectEvent $watcher "Changed" -Action $action
Register-ObjectEvent $watcher "Created" -Action $action
Register-ObjectEvent $watcher "Deleted" -Action $action

Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Red
try {
    while ($true) { Start-Sleep -Seconds 1 }
} finally {
    $watcher.Dispose()
}
```

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo seguir trabajando desde Cursor?**
R: Sí, exactamente igual. Solo agregas `git push` cuando quieras actualizar.

**P: ¿Cuánto tarda en actualizarse?**
R: Con Vercel, entre 1-2 minutos después de hacer push.

**P: ¿Es gratis?**
R: Sí, Vercel y GitHub tienen planes gratuitos generosos.

**P: ¿Puedo tener un dominio personalizado?**
R: Sí, Vercel permite agregar dominios personalizados gratis.

---

## 🆘 Soporte

Si tienes problemas, revisa:
- Los logs en Vercel Dashboard
- La consola de GitHub
- Los mensajes de error en la terminal


