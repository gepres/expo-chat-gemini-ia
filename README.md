# Expo Gemini 🤖✨

Aplicación móvil multiplataforma (iOS / Android / Web) construida con **Expo** y **React Native** que integra los modelos de **Google Gemini** para ofrecer tres experiencias de IA dentro de una misma app:

1. **Prompt básico** — consultas de una sola respuesta (streaming en tiempo real).
2. **Historial conversacional** — chat persistente con contexto de conversación.
3. **Generación de imágenes** — crear y editar imágenes a partir de texto y/o imágenes de referencia.

El objetivo del proyecto es servir como base práctica para entender cómo consumir una API de IA generativa desde una app móvil hecha con Expo Router, manejando **streaming SSE**, subida de **archivos multipart**, **selección de imágenes** desde la galería/cámara y **estado global** con Zustand.

---

## 📱 Funcionalidades

### 1. Prompt básico (`/basic-prompt`)
- Envía un prompt al backend y recibe la respuesta **token por token** (streaming).
- Soporte opcional para adjuntar imágenes como contexto del prompt.
- Renderizado de la respuesta con soporte Markdown.

### 2. Historial conversacional (`/chat-history`)
- Conversación continua con el modelo manteniendo el `chatId` entre mensajes.
- El backend recuerda los mensajes previos de la sesión.
- Input personalizado con selector de imágenes.

### 3. Generación de imágenes (`/image-generation`)
- Genera imágenes a partir de un prompt en lenguaje natural.
- Permite seleccionar **estilos predefinidos** (`StyleSelector`).
- Muestra un **slideshow** y una **cuadrícula de generaciones previas**.
- Persiste las generaciones en un store de Zustand (`store/image-playground`).
- Soporta **edición** de imágenes enviando una imagen de referencia junto al prompt.

---

## 🧱 Stack Técnico

| Área | Tecnología |
|------|------------|
| Framework | [Expo SDK 53](https://docs.expo.dev/) + React Native 0.79 |
| Routing | [expo-router](https://docs.expo.dev/router/introduction/) (file-based) |
| Lenguaje | TypeScript 5.8 |
| UI | [UI Kitten](https://akveo.github.io/react-native-ui-kitten/) + Eva Design |
| Iconos | `@expo/vector-icons` (Ionicons) |
| Estado global | [Zustand](https://github.com/pmndrs/zustand) |
| HTTP | Axios + `expo/fetch` (para streaming) |
| Imágenes | `expo-image`, `expo-image-picker` |
| Markdown | `react-native-markdown-display` |
| Carrusel | `react-native-reanimated-carousel` |

---

## 📂 Estructura del Proyecto

```
expo-gemini/
├── app/                        # Rutas (file-based routing)
│   ├── _layout.tsx             # Layout raíz (providers UI Kitten, theming)
│   └── (chat)/
│       ├── _layout.tsx         # Stack navigator de las pantallas IA
│       ├── index.tsx           # Menú principal
│       ├── basic-prompt.tsx
│       ├── chat-history.tsx
│       └── image-generation.tsx
├── actions/
│   ├── gemini.api.ts           # Instancia axios con baseURL del backend
│   ├── gemini/
│   │   ├── basic-prompt.action.ts
│   │   ├── basic-prompt-stream.action.ts
│   │   ├── chat-stream.action.ts
│   │   ├── image-generation.actions.ts
│   │   └── index.ts
│   ├── helpers/
│   │   ├── prompt-with-images.ts   # Subida multipart con archivos
│   │   └── url-to-image-file.ts
│   └── image-picker/
├── components/
│   ├── chat/                   # ChatMessages, CustomInputBox
│   └── image-generation/       # Slideshow, StyleSelector, Grid, NotImages
├── store/
│   └── image-playground/       # Zustand store para galería de imágenes
├── hooks/                      # useThemeColor, etc.
├── constants/
└── scripts/reset-project.js
```

---

## 🔌 Backend requerido

Esta app **no incluye el servidor**: consume una API REST externa (usualmente el proyecto NestJS ([https://github.com/gepres/chat-gemini-ia-nestjs](https://github.com/gepres/chat-gemini-ia-nestjs))) que expone los siguientes endpoints:

| Método | Endpoint | Uso |
|--------|----------|-----|
| POST | `/basic-prompt-stream` | Prompt único con streaming SSE |
| POST | `/chat-prompt-stream` | Chat con contexto (requiere `chatId`) |
| POST | `/image-generation` | Generación / edición de imágenes |

Los endpoints reciben `multipart/form-data` con los campos `prompt`, `chatId` (cuando aplica) y `files[]`.

---

## 🚀 Cómo implementarlo

### 1. Requisitos previos

- Node.js ≥ 18
- npm o yarn
- **Expo Go** en tu dispositivo físico, o un emulador Android / simulador iOS
- Backend Gemini corriendo (por ejemplo en `http://localhost:3000`)

### 2. Instalación

```bash
git clone <este-repo>
cd expo-gemini
npm install
```

### 3. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con la URL del backend:

```env
EXPO_PUBLIC_GEMINI_API_URL=http://192.168.x.x:3000/api/gemini
```

> ⚠️ **Importante**: si pruebas en un **dispositivo físico**, no uses `localhost` — debes usar la **IP de tu máquina en la LAN** para que el teléfono pueda alcanzarla.

### 4. Levantar la app

```bash
npx expo start
```

Desde la terminal de Expo podrás abrir la app en:

- 📱 **Expo Go** escaneando el QR
- 🤖 [Emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/) (`a`)
- 🍎 [Simulador iOS](https://docs.expo.dev/workflow/ios-simulator/) (`i`)
- 🌐 Navegador web (`w`)

### 5. Scripts disponibles

```bash
npm run start        # Inicia Expo
npm run android      # Inicia en emulador Android
npm run ios          # Inicia en simulador iOS
npm run web          # Inicia en el navegador
npm run lint         # Ejecuta ESLint
npm run reset-project  # Limpia el proyecto (mueve ejemplo a app-example/)
```

---

## 🧠 Cómo funciona el streaming

El streaming de respuestas se hace con `expo/fetch` (no axios) porque necesita acceso al `ReadableStream`:

```ts
const response = await fetch(`${API_URL}/basic-prompt-stream`, {
  method: 'POST',
  body: formData,
});

const reader = response.body?.getReader();
const decoder = new TextDecoder('utf-8');
let result = '';

while (true) {
  const { done, value } = await reader!.read();
  if (done) break;
  result += decoder.decode(value);
  onChunk(result);   // UI se actualiza en cada chunk
}
```

Cuando se adjuntan imágenes, la subida se delega al helper `promptWithImages` que arma el `FormData` con axios.

---

## 🎨 Theming

El proyecto usa **UI Kitten + Eva Design** con soporte de tema claro/oscuro que respeta el esquema del sistema. Los colores temáticos se consumen desde el hook `useThemeColor`.

---