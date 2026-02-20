# BancoDePruebas - Instrucciones de Ejecución

## Requisitos
- Node.js 18+ instalado
- npm 9+

## Ejecución en Desarrollo

```bash
# 1. Instalar dependencias (si no lo ha hecho)
npm install

# 2. Compilar Next.js
npm run build

# 3. En una terminal ejecutar el servidor:
cd dist/win-unpacked/resources/app
npm run dev

# 4. En otra terminal, ejecutar Electron:
npm run desktop:start
```

## Alternativa Simple
Ejecutar directamente en el directorio root:
```bash
electron .
```

## Problemas Conocidos

### Ejecutable .exe
El archivo BancoDePruebas.exe requiere que npm y Node.js estén disponibles en el PATH. Si npm no está accesible en el contexto de Electron, ejecute usando el método de desarrollo anterior.

### Puerto 3000 en uso
Si recibe error de puerto en uso:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Distribución Recomendada
Para crear un instalador verdaderamente standalone, considere:

1. **Electron Forge** (configuración mejorada)
2. **NSIS Installer** (empaquetar bin + recursos)
3. **Inno Setup** (alternativa a NSIS)

El archivo `installer.nsi` en `dist/` es una plantilla básica de NSIS que puede ser mejorada.

## Estructura de Directorios

```
proyecto/
├── electron-main.js          # Punto de entrada Electron
├── dist/
│   └── win-unpacked/
│       ├── resources/app/    # Aplicación
│       │   ├── .next/        # Compilación Next.js
│       │   ├── node_modules/ # Dependencias
│       │   ├── package.json
│       │   └── prisma/
│       └── BancoDePruebas.exe # (Generado)
└── package.json
```

## Notas de Desarrollo

- Cliente: React 19 + Next.js 16 (Turbopack)
- Base: Electron 26
- BD: Prisma + SQLite (desarrollo)
- Auth: JWT + bcrypt

## Soporte

Para más información sobre Electron + Next.js, consulte:
- https://www.electronjs.org/docs
- https://nextjs.org/docs
