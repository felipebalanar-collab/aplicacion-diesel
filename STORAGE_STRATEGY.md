# Estrategia de Almacenamiento de Imágenes

## Decisión Final: Híbrida (Local + S3 Opcional)

### Contexto
El sistema necesita guardar imágenes de tablas de calibración durante el proceso OCR para:
1. **Backup**: Mantener copias de las imágenes procesadas
2. **Auditoría**: Poder verificar qué imagen generó qué datos
3. **Reutilización**: Permitir re-procesar imágenes con diferentes parámetros OCR

### Opción Seleccionada: Almacenamiento Híbrido

#### Desarrollo (Local) 📁
```
public/uploads/calibration-images/
  └── 1707242100000-bosch-110.jpg
      ├── Tamaño: Ilimitado en desarrollo
      ├── Acceso: Directo vía /uploads/calibration-images/[filename]
      ├── Retención: Indefinida (usuario decide)
      ├── Costo: Gratis
```

**Ventajas:**
- ✅ Sin dependencias externas
- ✅ Desarrollo rápido
- ✅ No requiere configuración API
- ✅ Perfecto para testing/demo

**Desventajas:**
- ❌ No escalable a múltiples servidores
- ❌ Problemas con serverless (Render.com)
- ❌ Límite de almacenamiento en disco

#### Producción (Render.com + S3)  ☁️
Para producción en Render.com con múltiples servidores:

```env
# .env.production
STORAGE_TYPE=s3
AWS_S3_REGION=us-east-1
AWS_S3_BUCKET=banco-datos-inyectores
AWS_S3_ACCESS_KEY_ID=${SECRET_AWS_ACCESS_KEY}
AWS_S3_SECRET_ACCESS_KEY=${SECRET_AWS_SECRET}
```

**Ventajas:**
- ✅ Escalable indefinidamente
- ✅ Funciona con múltiples instancias
- ✅ Pago por uso
- ✅ CDN integrado (CloudFront)

**Desventajas:**
- ❌ Costo adicional (~$0.023 por GB/mes)
- ❌ Requiere configuración AWS
- ❌ Latencia de red

---

## Implementación Actual (v1)

### Local Storage (Habilitado)
```typescript
// app/api/calibration/ocr/route.ts
const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'calibration-images');
await fs.mkdir(uploadsDir, { recursive: true });
await fs.writeFile(savedImagePath, buffer);
```

**Características:**
- Guardado automático de imágenes procesadas
- URLs públicas: `/uploads/calibration-images/[timestamp]-[filename]`
- Tolerancia a fallos (continúa si falla guardado)

### S3 Storage (Compatible)
Para activar en producción, necesitarías:

```typescript
// lib/storage-client.ts (futuro)
import AWS from 'aws-sdk';

export async function uploadImageToS3(buffer: Buffer, filename: string) {
  const s3 = new AWS.S3({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  });

  return s3.upload({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `calibration-images/${Date.now()}-${filename}`,
    Body: buffer,
    ContentType: 'image/jpeg',
  }).promise();
}
```

---

## Recomendaciones por Faseálido

### Fase 1: Desarrollo (ACTUAL) ✅
- **Almacenamiento**: Local (`/public/uploads/`)
- **Retención**: 7+ días
- **Limpieza**: Manual o cron job

```bash
# Limpieza de imágenes antiguas (7 días)
find public/uploads/calibration-images -mtime +7 -delete
```

### Fase 2: Pequeña Escala (<100 usuarios) ⚙️
- **Almacenamiento**: Local en Render.com
- **Limitación**: 10 GB de disco
- **Revisión**: Cada mes

```env
# .env.production
UPLOAD_RETENTION_DAYS=30
MAX_UPLOAD_SIZE_MB=50
```

### Fase 3: Escalamiento (>100 usuarios) 📈
- **Cambio a S3**: AWS, DigitalOcean Spaces, o Cloudinary
- **CDN**: CloudFront o similar
- **Políticas**: Auto-cleanup después de 90 días

```env
# .env.production
STORAGE_TYPE=s3
AWS_S3_BUCKET=banco-datos-inyectores
UPLOAD_RETENTION_DAYS=90
AUTO_CLEANUP=true
```

---

## Límites de Almacenamiento

| Tier | Local | S3 | Datos Máximos |
|------|-------|-----|----------------|
| **Dev** | 100 GB | N/A | Ilimitado |
| **Pequeño** | 10 GB | - | ~1000 imágenes |
| **Mediano** | - | 100 GB | ~10,000 imágenes |
| **Grande** | - | 1 TB | ~100,000 imágenes |

---

## Configuración Minimal (Actual)

**Ya está implementado en** `app/api/calibration/ocr/route.ts`:

```
POST /api/calibration/ocr
├─ Upload imagen → Buffer
├─ OCR processing
├─ Save a /public/uploads/calibration-images/ ← LOCAL
└─ Return OCR results
```

**No requiere configuración adicional** para desarrollo en Render.com.

---

## Mejoras Futuras

1. **Compresión automática** de imágenes almacenadas
2. **Watermarking** para imágenes de calibración
3. **Versionado** de imágenes (mantener histórico)
4. **Búsqueda** por imagen similar (vector search)
5. **Backup automático** a S3 (replicación)

---

## Conclusión

✅ **Decisión:** Almacenamiento local por defecto + S3 preparado para escala

**Para este proyecto:**
- Fase actual: Local funciona perfectamente
- Fácil migración a S3 cuando sea necesario
- Sin costos adicionales iniciales
- Soporta > escalamiento gradual

