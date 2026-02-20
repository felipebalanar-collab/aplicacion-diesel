# 🔐 CREDENCIALES DE ACCESO - BancoDePruebas

## ✅ Usuario Admin (Creado exitosamente)

| Campo | Valor |
|-------|-------|
| **Email** | `admin@test.com` |
| **Contraseña** | `password123` |
| **Nombre** | Admin User |
| **Rol** | admin |
| **Permisos** | Acceso completo a todas las funcionalidades |

---

## 🚀 Cómo Acceder

### Opción 1: Ejecutable Desktop (GUI)
```bash
# Ejecutar desde proyecto source
cd E:\aplicacion diesel\my-desktop-app
npm run dev                          # Terminal 1: Inicia Next.js
$env:ELECTRON_DEV='true'
npm run desktop:start                # Terminal 2: Inicia Electron

# O ejecutar .exe directamente (distributable)
.\dist\win-unpacked\BancoDePruebas.exe
```

1. Espera a que se abra la ventana Electron
2. Verás la pantalla de login
3. Ingresa las credenciales arriba
4. Click en "Ingresar"

### Opción 2: Web Browser
```bash
# Terminal 1
npm run dev

# Luego en navegador
http://localhost:3000/login
```

---

## 📋 Funcionalidades Disponibles (Admin)

Con este usuario tienes acceso a:

- ✅ **Dashboard Admin** - Visualización de estadísticas
- ✅ **Gestión de Usuarios** - Crear, editar, eliminar usuarios
- ✅ **Gestión de Inyectores** - 56 modelos de inyectores precargados
- ✅ **Calibración** - Importar, procesar y validar inyectores con OCR
- ✅ **Importación Masiva** - Bulk import de datos
- ✅ **Base de Datos** - 56 modelos de inyectores diesel/gasolina

---

## 🔧 Información de Desarrollo

**Base de Datos:**
- Tipo: SQLite
- Ubicación: `prisma/dev.db`
- Schema: Sincronizado con Prisma

**Prisma Studio** (Inspeccionar BD):
```bash
npx prisma studio

# Acceder a http://localhost:5555
```

**Inyectores Precargados:**
- Bosch Diesel (0445110183, 0445110059, etc.)
- Bosch Piezo (0445115067)
- Delphi Diesel (EJBR00101Z)
- Denso Diesel (23670-30050)
- Bosch GDI Gasolina (0261500011)
- + 50 modelos genéricos adicionales

---

## 🛡️ Seguridad

- Contraseñas hasheadas con bcrypt
- JWT para autenticación
- Contexto de aislamiento en Electron
- Roles y permisos granulares

---

## 📱 Tecnologías

- **Frontend:** React 19 + Next.js 16 (Turbopack)
- **Backend:** Node.js + Express (API routes)
- **Desktop:** Electron 40.2.1
- **BD:** Prisma ORM + SQLite
- **Auth:** JWT + bcrypt
- **OCR:** Tesseract.js

---

## 🆘 Troubleshooting

**Olvide la contraseña:**
```bash
# Ejecutar script para crear nuevo admin
node init-admin.js

# O modificar directamente con Prisma Studio:
# npx prisma studio → Edit user → passwordHash
```

**Puerto 3000 en uso:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Electron no carga:**
```bash
# Verificar que npm run dev está activo en otra terminal
# Revisar logs en: ./electron.log
cat electron.log
```

---

**Fecha de creación:** 6 febrero 2026  
**Versión:** 0.1.0  
**Ambiente:** Desarrollo
