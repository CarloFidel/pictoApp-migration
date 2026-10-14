# Picto App

Aplicación móvil de pictogramas para entornos educativos y de comunicación asistida. Este repositorio es la migración a **Expo SDK 57**, **React Native** y **TypeScript**, con navegación por archivos de **Expo Router**.

La interfaz y los flujos de entrada ya están montados. Las pantallas de cuenta (perfil, fotos, horarios, artículos y ayuda) son placeholders a la espera de migrar la lógica de la app anterior.

## Stack

- Expo SDK 57 y React Native 0.86
- React 19 y TypeScript
- Expo Router (rutas tipadas)
- NativeWind 5 y Tailwind CSS 4
- React Hook Form y Zod
- React Native Reanimated y Gesture Handler
- Fuente Hanken Grotesk

El proyecto usa [Bun](https://bun.sh) (`bun.lock`).

## Cómo ejecutarlo

```bash
bun install
bun run start
```

Plataformas:

```bash
bun run ios
bun run android
bun run web
```

Otros scripts:

- `bun run lint` — ESLint vía Expo
- `npx tsc --noEmit` — comprobación de tipos

Instala paquetes de Expo con `bunx expo install <paquete>` para resolver versiones compatibles con el SDK.

## Rutas

La entrada (`/`) redirige a `/dashboard`.

| Ruta | Qué muestra |
| --- | --- |
| `/onboarding` | Flujo de bienvenida por pasos |
| `/login` | Inicio de sesión |
| `/register` | Registro |
| `/dashboard` | Inicio: cuenta, ayuda y preferencias |
| `/myProfile` | Información personal (placeholder) |
| `/myPhotos` | Fotos (placeholder) |
| `/mySchedules` | Horarios guardados (placeholder) |
| `/myArticles` | Artículos (placeholder) |
| `/faqs` | Preguntas frecuentes (placeholder) |
| `/about` | Sobre la app (placeholder) |

Los grupos `(auth)` y `(dashboard)` no forman parte de la URL. Definen stacks separados, ambos sin cabecera nativa.

## Estructura

```
src/
  app/                  rutas de Expo Router
    _layout.tsx         fuentes, splash y slot raíz
    (auth)/             onboarding, login y registro
    (dashboard)/        inicio y secciones de cuenta
  modules/
    auth/               formularios, schema Zod e interfaces
    onboarding/         pasos, reducer y animaciones
    dashboard/          pantalla de inicio e ítems de navegación
  components/ui/        botones, inputs y loading compartidos
  styles/               estilos globales (sombras, color)
  constants/            tema
assets/                 iconos, splash y fuentes
```

Los alias de TypeScript son `@/*` → `src/*` y `@/assets/*` → `assets/*`.

## Qué hay implementado

- **Onboarding.** Secuencia de pasos con un reducer, barra de progreso y transiciones.
- **Login y registro.** Formularios validados con Zod. El envío todavía solo registra los datos en consola; no hay API de autenticación.
- **Dashboard.** Cabecera de usuario y listas de Cuenta, Ayuda y Preferencias. Idioma no tiene ruta todavía.
- **Estilos.** NativeWind con tokens de color y la familia Hanken Grotesk en `src/global.css`. Metro está envuelto con `withNativewind`.

## Configuración nativa

`ios/` y `android/` no se editan a mano. El comportamiento nativo se define en `app.json` (identificadores, splash, iconos y plugins). El compilador de React y las rutas tipadas están activados en `experiments`.
