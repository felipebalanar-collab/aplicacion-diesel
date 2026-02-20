# 📦 Guía de Despliegue en GitHub + Render.com

Esta guía explica cómo subir tu proyecto a GitHub y desplegarlo en Render.com para que esté disponible remotamente.

## Paso 1: Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. **Nombre del repositorio**: `banco-pruebas` (o el que prefieras)
3. **Descripción**: "Sistema de gestión remota de inyectores diesel"
4. **Privado**: ✅ Recomendado (solo tú accedes)
5. Click en **"Create repository"**

## Paso 2: Conectar tu máquina con GitHub

### Windows PowerShell - Ejecuta estos comandos en orden:

```powershell
cd "e:\aplicacion diesel\my-desktop-app"

# Configura GitHub (solo primera vez)
git config --global user.email "tu-email@gmail.com"
git config --global user.name "Tu Nombre"

# Reemplaza URL con tu repositorio (ver en GitHub después de crear)
git remote add origin https://github.com/TU_USUARIO/banco-pruebas.git

# Cambiar rama a 'main' (GitHub usa 'main' por defecto)
git branch -M main

# Pushear el código a GitHub
git push -u origin main
```

**Nota**: GitHub pedirá autenticación. Usa:
- **Usuario**: Tu usuario de GitHub
- **Contraseña**: Token personal (crear en Settings → Developer settings → Personal access tokens)

### Si la URL está mal, corrígete con:
```powershell
git remote set-url origin https://github.com/TU_USUARIO/banco-pruebas.git
git remote -v  # Verifica que esté bien
```

## Paso 3: Verificar que está en GitHub

- Abre [github.com/tu-usuario/banco-pruebas](https://github.com/tu-usuario/banco-pruebas)
- Deberías ver todos tus archivos (app/, prisma/, package.json, etc.)

## Paso 4: Crear cuenta en Render.com e iniciar deploy

### 4.1 Registrarse en Render

1. Ve a [render.com](https://render.com)
2. Click en **"Sign up with GitHub"**
3. Autoriza a Render para acceder a tu GitHub
4. Confirma email (verifica tu bandeja)

### 4.2 Crear Web Service en Render

1. En Render dashboard, click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio `banco-pruebas` (si no aparece, click en "Connect account")
3. Espera a que Render lo detecte

### 4.3 Configurar el Web Service

| Campo | Valor |
|-------|-------|
| **Name** | banco-pruebas |
| **Environment** | Node |
| **Region** | Frankfurt (o tu región) |
| **Branch** | main |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Free ✅ |

### 4.4 Agregar variables de entorno

En la sección **Environment Variables**, añade:

```
DATABASE_URL   = postgresql://usuario:password@host:5432/dbname
JWT_SECRET     = algo-muy-secreto-y-largo-de-al-menos-32-caracteres
ADMIN_SECRET   = tu-contraseña-admin-super-fuerte
NODE_ENV       = production
```

**⚠️ IMPORTANTE**: 
- Cambiar todos los secretos
- `DATABASE_URL` puede ser PostgreSQL gratuito (ver abajo)
- NO compartir estos valores

### 4.5 Crear base de datos PostgreSQL (Render)

1. En Render dashboard, **"New +"** → **"PostgreSQL"**
2. **Name**: `banco-pruebas-db`
3. **Plan**: Free ✅
4. Click en **"Create Database"**
5. Espera 2-3 minutos a que se inicialice
6. Copiar la **"External Database URL"** (cadena larga con postgresql://)
7. Pegar en la variable `DATABASE_URL` del Web Service

## Paso 5: Deploy

1. Render inicia automáticamente el build
2. Ver logs en **"Logs"** tab
3. Esperar hasta que diga **"Live"** (color verde)
4. Tu URL quedará como: `https://banco-pruebas.onrender.com`

## Paso 6: Inicializar la base de datos en producción

Una vez que Render esté en Live:

```powershell
# Desde tu máquina local, ejecutar migraciones en la DB remota
# (Render ejecuta esto automáticamente si incluyes en build command)

# Alternativa: SSH a Render y ejecutar manualmente
```

O: en Render dashboard → Web Service → **"Shell"**, ejecuta:

```bash
npx prisma db push
node prisma/seed.js
```

## Paso 7: Acceder a tu aplicación

- **URL**: https://banco-pruebas.onrender.com
- **Login**: test@example.com / test123
- **Admin Secret**: tu_admin_secret_nuevo

## Paso 8: Actualizaciones futuras

Cada vez que hagas cambios:

```powershell
cd "e:\aplicacion diesel\my-desktop-app"

# Hacer cambios en archivos...

# Commit y push
git add .
git commit -m "feature: Agregar nueva tabla de calibración"
git push origin main
```

Render detecta el push en `main` y deploya automáticamente. Ver logs en Render dashboard.

## Troubleshooting

### "Build failed" en Render
- Ver logs en Render → "Logs" tab
- Verificar que `package.json` tenga `build: "next build"`
- Verificar que `.env` esté ignorado en `.gitignore`

### "502 Bad Gateway" después del deploy
- Esperar 1-2 minutos a que el servicio arranque
- Ver logs en Render → "Logs"
- Verificar que `DATABASE_URL` sea correcto

### No puedo conectar a la base de datos
- Verificar que PostgreSQL URL existe (`DATABASE_URL`)
- Probar localmente: `psql "postgresql://..."`
- En Render Shell: `npx prisma db push` para verificar conexión

### "Port already in use" en logs
- Render asigna puerto automáticamente (variable `PORT`)
- Solo ejecutar `npm start` sin `--port 3000`

## URLs útiles

| Recurso | Link |
|---------|------|
| Tu repositorio | https://github.com/TU_USUARIO/banco-pruebas |
| Aplicación | https://banco-pruebas.onrender.com |
| Render Dashboard | https://dashboard.render.com/ |
| GitHub Settings | https://github.com/settings/developer-settings/personal-access-tokens |

## Siguiente: Gestión de usuarios remotamente

Una vez desplegado en Render:
1. Crear nuevos usuarios desde API o admin panel
2. Implementar roles/permisos (admin, usuario, etc.)
3. Subir OCR de tablas de calibración
4. Sincronizar datos entre clientes Electron

---

**¿Problemas?** Revisar logs en Render o GitHub Actions.
