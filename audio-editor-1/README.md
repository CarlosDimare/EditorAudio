# Audio Editor

Este proyecto es un editor de audio multipista que permite a los usuarios cargar, editar y procesar clips de audio. El editor incluye funcionalidades similares a las de aplicaciones profesionales de edición de audio, permitiendo la manipulación de pistas, efectos y visualización de formas de onda.

## Estructura del Proyecto

```
audio-editor
├── src
│   ├── js
│   │   ├── core
│   │   │   ├── AudioEngine.ts
│   │   │   ├── Timeline.ts
│   │   │   └── Track.ts
│   │   ├── effects
│   │   │   ├── Compressor.ts
│   │   │   ├── Delay.ts
│   │   │   ├── Equalizer.ts
│   │   │   └── Reverb.ts
│   │   ├── ui
│   │   │   ├── Components.ts
│   │   │   ├── Controls.ts
│   │   │   └── Waveform.ts
│   │   └── utils
│   │       ├── AudioUtils.ts
│   │       └── TimeUtils.ts
│   ├── styles
│   │   ├── components
│   │   │   ├── controls.css
│   │   │   ├── timeline.css
│   │   │   └── tracks.css
│   │   └── main.css
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Funcionalidades

- **Carga de Audio**: Permite a los usuarios cargar archivos de audio en el editor.
- **Reproducción y Control**: Incluye controles para reproducir, pausar y detener la reproducción de audio.
- **Edición de Pistas**: Los usuarios pueden agregar, eliminar y ajustar pistas de audio.
- **Efectos de Audio**: Implementa efectos como compresión, retardo, ecualización y reverberación.
- **Visualización de Formas de Onda**: Muestra visualmente las formas de onda de los clips de audio.

## Requisitos

- Node.js
- TypeScript

## Instalación

1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   ```
2. Navega al directorio del proyecto:
   ```
   cd audio-editor
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Para iniciar el editor de audio, abre el archivo `index.html` en un navegador web. Asegúrate de tener los archivos de audio disponibles para cargar y editar.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.