# Configuración de Vercel - Variables de Entorno

## ✅ Estado Actual

- ✅ Git configurado
- ✅ Repositorio en GitHub: https://github.com/zinergia-marketing/web
- ✅ Vercel CLI instalado
- ⏳ Pendiente: Conectar Vercel con GitHub

---

## 📋 Pasos para Conectar Vercel

### 1. Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Click en **"Sign Up"**
3. Elige **"Continue with GitHub"**
4. Autoriza la conexión con tu cuenta de GitHub

### 2. Conectar tu Repositorio
1. En el dashboard de Vercel, click en **"Add New Project"**
2. Selecciona el repositorio: **`zinergia-marketing/web`**
3. Vercel detectará automáticamente:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Click en **"Deploy"**

### 3. Configurar Variables de Entorno

Después del primer deploy, ve a **Settings > Environment Variables** y agrega:

#### Variables Requeridas:

```env
NEXT_PUBLIC_BREVO_API_KEY=xkeysib-tu_api_key_aqui
BREVO_LIST_ID=tu_list_id_aqui
NEXT_PUBLIC_GA_ID=G-XXXXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=57XXXXXXXXX
NEXT_PUBLIC_DOMAIN=zinergiamarketing.com
```

**Importante:** 
- Marca todas como disponibles para **Production, Preview, y Development**
- Las variables que empiezan con `NEXT_PUBLIC_` son públicas y se exponen al cliente
- Las demás son privadas y solo están disponibles en el servidor

### 4. Redesplegar

Después de agregar las variables:
1. Ve a **Deployments**
2. Click en los **3 puntos** del último deployment
3. Selecciona **"Redeploy"**
4. Esto aplicará las nuevas variables de entorno

---

## 🚀 Flujo de Trabajo Después de Configurar

Una vez configurado, cada vez que hagas cambios:

```bash
# 1. Haces cambios en Cursor (como siempre)
# 2. Guardas los archivos
# 3. Ejecutas:
git add .
git commit -m "Descripción de los cambios"
git push

# 4. Vercel automáticamente:
#    - Detecta el cambio en GitHub
#    - Hace build del proyecto
#    - Despliega en 1-2 minutos
#    - Tu página está actualizada online
```

---

## 🔗 Enlaces Útiles

- **Repositorio GitHub**: https://github.com/zinergia-marketing/web
- **Dashboard Vercel**: https://vercel.com/dashboard
- **Documentación Vercel**: https://vercel.com/docs

---

## ✅ Checklist de Configuración

- [ ] Cuenta de Vercel creada
- [ ] Repositorio conectado en Vercel
- [ ] Primer deploy completado
- [ ] Variables de entorno configuradas:
  - [ ] `NEXT_PUBLIC_BREVO_API_KEY`
  - [ ] `BREVO_LIST_ID`
  - [ ] `NEXT_PUBLIC_GA_ID`
  - [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER`
  - [ ] `NEXT_PUBLIC_DOMAIN`
- [ ] Redesplegado con las variables
- [ ] Verificado que la página funciona online

---

## 🆘 Troubleshooting

### El deploy falla
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs en Vercel Dashboard > Deployments > [tu deployment] > Logs

### Las variables no funcionan
- Asegúrate de haber redesplegado después de agregar las variables
- Verifica que las variables estén marcadas para "Production"

### Cambios no se reflejan
- Verifica que hayas hecho `git push`
- Revisa el estado del deployment en Vercel Dashboard
- Puede tardar 1-2 minutos en desplegarse

---

## 📝 Notas

- Vercel te dará una URL automática tipo: `tu-proyecto.vercel.app`
- Puedes agregar un dominio personalizado después en Settings > Domains
- Cada push a `main` despliega automáticamente a producción
- Los pushes a otras ramas crean "previews" que puedes revisar antes de mergear


