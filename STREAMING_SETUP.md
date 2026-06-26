# Streaming Setup Guide

Guía completa para configurar el backend de streaming de Eternal Beat Radio Chile.

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                    ETERNAL BEAT RADIO - ARQUITECTURA             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐     ┌──────────────┐     ┌──────────────────┐   │
│  │  DJ Live │────▶│  AzuraCast   │────▶│   Listeners      │   │
│  │  (BUTT)  │     │  (Icecast +  │     │   (Browser/App)  │   │
│  └──────────┘     │  Liquidsoap) │     └──────────────────┘   │
│                    │              │                              │
│  ┌──────────┐     │  ┌────────┐  │     ┌──────────────────┐   │
│  │  iTunes  │────▶│  │Auto DJ │  │     │   PWA Frontend   │   │
│  │  Library │     │  │Playlists│  │────▶│   (Netlify)      │   │
│  └──────────┘     │  └────────┘  │     └──────────────────┘   │
│                    └──────────────┘                              │
│                           │                                     │
│                    ┌──────────────┐                              │
│                    │   API REST   │                              │
│                    │  /api/nowplay│                              │
│                    │  /api/history│                              │
│                    └──────────────┘                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1. AzuraCast Setup

### Instalación

```bash
# En un VPS con Ubuntu 22.04+ (recomendado: 2GB RAM, 2 vCPU)
curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/main/docker.sh | bash

# Seguir el wizard de instalación
# URL por defecto: http://tu-ip:80
```

### Configuración de Estación

1. Crear nueva estación: **Eternal Beat Radio Chile**
2. Configurar formato de stream:
   - Formato: MP3
   - Bitrate: 320kbps
   - Sample Rate: 44100 Hz
3. Configurar mount point: `/radio`
4. Habilitar API pública

### Subir Música

1. Ir a **Media > Music Files**
2. Subir tracks organizados por carpeta (playlist)
3. Crear playlists:
   - MINIMAL (weight: 20)
   - PROGRE ENERO 2026 (weight: 30)
   - PROGRE FEBRERO 2026 (weight: 25)
   - PROGRE NOVIEMBRE 2025 (weight: 15)
   - WARMUP (weight: 10)
4. Activar **AutoDJ** con las playlists configuradas

### API Endpoints

```
GET /api/nowplaying/{station_id}   → Track actual
GET /api/station/{id}/history      → Historial
GET /api/station/{id}/schedule     → Programación
```

## 2. DJ Live con BUTT

### Instalación de BUTT

1. Descargar BUTT desde: https://danielnoethen.de/butt/
2. Instalar en tu sistema (Windows/Mac/Linux)

### Configuración

```
Servidor:    tu-dominio.com
Puerto:      8000
Password:    [tu DJ password de AzuraCast]
Mount:       /live
Tipo:        Icecast
Formato:     MP3 320kbps
```

### Pasos para transmitir en vivo

1. Abrir BUTT
2. Configurar input de audio (interfaz de audio / virtual cable)
3. Click en **Play** para conectar
4. AzuraCast detecta el DJ y corta el AutoDJ automáticamente
5. Al desconectar, AutoDJ retoma la transmisión

## 3. Deploy en Netlify

### Frontend (Este proyecto)

```bash
# Build del proyecto
npm run build

# Deploy en Netlify
# Opción 1: CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist

# Opción 2: Conectar repo de GitHub
# En Netlify Dashboard > New Site > Import from Git
# Build command: npm run build
# Publish directory: dist
```

### Variables de Entorno (Netlify)

```
VITE_STREAM_URL=https://tu-azuracast.com/radio
VITE_API_URL=https://tu-azuracast.com/api
VITE_STATION_ID=1
```

### Configuración de dominio

1. Agregar dominio personalizado en Netlify
2. Configurar DNS (CNAME → tu-site.netlify.app)
3. Habilitar HTTPS automático

## 4. Configuración Avanzada

### WebSocket para Chat

Para el chat en tiempo real, se recomienda usar un servicio como:
- Firebase Realtime Database
- Supabase Realtime
- Socket.io con un servidor Node.js

### Monitoreo

- AzuraCast incluye estadísticas de listeners
- Configurar alertas si el stream se cae
- Usar UptimeRobot para monitorear disponibilidad

---

## Checklist de Deploy

- [ ] VPS configurado con AzuraCast
- [ ] Estación creada y música subida
- [ ] Playlists configuradas con pesos
- [ ] AutoDJ funcionando
- [ ] DJ credentials configurados
- [ ] BUTT testeado con conexión exitosa
- [ ] Frontend deployado en Netlify
- [ ] Dominio configurado con HTTPS
- [ ] API endpoints verificados
- [ ] PWA instalable verificada
