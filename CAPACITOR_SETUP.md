# ReSet App — Guía de Setup con Capacitor

## Estado actual de la integración

El proyecto ya tiene todos los cambios de código necesarios para funcionar
con Capacitor. Solo faltan los pasos de inicialización de las plataformas
nativas (se ejecutan **una sola vez**).

---

## Pasos de inicialización (una sola vez)

### 1. Inicializar Capacitor en el proyecto

```bash
npx cap init ReSet tech.resetapp.app --web-dir out
```

Esto genera el archivo `.capacitor/` con la configuración base.
**El `capacitor.config.ts` ya está creado** — el comando solo registra el proyecto.

### 2. Añadir las plataformas nativas

```bash
# Android (requiere Android Studio y Java 17+)
npx cap add android

# iOS (solo macOS, requiere Xcode 15+)
npx cap add ios
```

### 3. Configurar HTTP para el servidor de desarrollo (Android)

Sigue las instrucciones en `ANDROID_HTTP_SETUP.md` para permitir conexiones
HTTP al servidor de la API. **Sin este paso, la app en Android no cargará datos.**

### 4. Primer build y sync

```bash
npm run build:mobile
# equivale a: next build && npx cap sync
```

---

## Flujo de trabajo diario

```bash
# 1. Editar código en Next.js
# 2. Compilar y sincronizar con los proyectos nativos:
npm run build:mobile

# 3. Abrir en el IDE nativo:
npm run cap:android   # Abre Android Studio
npm run cap:ios       # Abre Xcode

# 4. Compilar y correr en el emulador/dispositivo desde el IDE nativo.
```

---

## Desarrollo en modo live-reload (opcional, más rápido)

Para evitar el ciclo build → sync durante el desarrollo:

1. Inicia el servidor Next.js:
   ```bash
   npm run dev
   ```

2. Obtén la IP local de tu máquina (p.ej. `192.168.1.50`).

3. Descomenta temporalmente en `capacitor.config.ts`:
   ```typescript
   server: {
     url: "http://192.168.1.50:3000",
     cleartext: true,
   }
   ```

4. Sincroniza (`npx cap sync`) y abre en el IDE nativo.

⚠️ **Recuerda comentar el `server.url` antes del build de producción.**

---

## Consideraciones antes de publicar en stores

### Obligatorio
- [ ] La API debe estar en **HTTPS**: actualizar `NEXT_PUBLIC_API_URL`
- [ ] Eliminar/actualizar `network_security_config.xml` para no permitir HTTP
- [ ] Generar íconos y splash screens (ver `@capacitor/assets`)
- [ ] Configurar `appId`, `appName` y `version` en `capacitor.config.ts`
- [ ] Revisar y firmar el APK/IPA con las claves de producción

### Recomendado
- [ ] Integrar `@capacitor/push-notifications` para notificaciones (emergencias)
- [ ] Integrar `@capacitor/status-bar` para controlar el color de la barra de estado
- [ ] Integrar `@capacitor/keyboard` para ajustar el scroll cuando el teclado aparece
- [ ] Probar en dispositivos físicos (no solo emuladores)
- [ ] Probar el botón físico de atrás en Android en todos los flujos

### iOS específico
- [ ] Configurar `NSAppTransportSecurity` si la API aún usa HTTP
- [ ] Revisar los permisos en `Info.plist`
- [ ] Probar en iPhone con Dynamic Island y con notch clásico

---

## Arquitectura de la integración (resumen técnico)

| Área                  | Solución implementada                                  |
|-----------------------|--------------------------------------------------------|
| Build estático        | `output: 'export'` en `next.config.ts`                |
| Almacenamiento        | `lib/storage.ts` → localStorage en web / Preferences en nativo |
| Sesión persistente    | `AuthContext` restaura token+usuario desde storage al arrancar |
| Botón Atrás Android   | `CapacitorProvider.tsx` con `@capacitor/app`           |
| Safe areas (notch)    | CSS `env(safe-area-inset-*)` + clases `.safe-top-bar`, `.sidebar-safe-top` |
| Viewport              | `viewport-fit: cover` en `app/layout.tsx`             |
| Touch UX              | `overscroll-behavior-y: none`, `-webkit-tap-highlight-color: transparent` |
| Altura de pantalla    | `h-[100dvh]` (dynamic viewport, funciona con teclado virtual) |

---

## Plugins instalados

| Plugin                    | Propósito                                          |
|---------------------------|----------------------------------------------------|
| `@capacitor/core`         | Runtime base de Capacitor                          |
| `@capacitor/app`          | Botón físico de atrás, estado de la app (foreground/background) |
| `@capacitor/preferences`  | Almacenamiento key-value nativo (token, likes, etc.)|
| `@capacitor/android`      | Plataforma Android                                 |
| `@capacitor/ios`          | Plataforma iOS                                     |

---

## Pendientes para el futuro

1. **Notificaciones push** (`@capacitor/push-notifications`): el backend ya
   tiene el endpoint de emergencias; conectar con FCM (Android) / APNs (iOS).

2. **Refresco de token en resume**: cuando la app vuelve del fondo, verificar
   que el JWT no haya expirado. Ejemplo:
   ```typescript
   App.addListener('appStateChange', async ({ isActive }) => {
     if (isActive) await refreshTokenIfNeeded();
   });
   ```

3. **Teclado virtual**: en Android, el teclado puede cubrir inputs. Instalar
   `@capacitor/keyboard` y añadir `KeyboardResize.Body` para que el layout
   se ajuste automáticamente.

4. **StatusBar**: con `@capacitor/status-bar`, la barra de estado puede
   adoptar los colores del diseño (`#f8fafc` de fondo, icono oscuro).
