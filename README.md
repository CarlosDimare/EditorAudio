# Editor de Audio Multipista Web

Este es un editor de audio multipista que funciona completamente en el lado del cliente, directamente en tu navegador web. Está construido como una aplicación de una sola página, contenida en un único archivo `index.html`, utilizando JavaScript puro y la API de Web Audio.

## Características Principales

- **Carga de Pistas**: Carga múltiples archivos de audio (como `.wav`, `.mp3`) desde tu computadora.
- **Línea de Tiempo Interactiva**:
  - Visualiza las formas de onda de audio.
  - Arrastra el cabezal de reproducción para navegar por el tiempo.
  - Haz zoom para una edición más precisa.
- **Controles de Reproducción**:
  - Reproducir, pausar y detener la mezcla de audio.
- **Edición de Clips de Audio**:
  - **Mover**: Arrastra y suelta clips para cambiar su posición en el tiempo o moverlos entre pistas.
  - **Cortar**: Divide un clip en el punto exacto del cabezal de reproducción.
  - **Eliminar**: Borra clips seleccionados.
  - **Control de Volumen**: Ajusta el volumen de cada clip de forma individual.
  - **Mute y Solo**: Silencia clips o escúchalos de forma aislada.
  - **Fades**: Aplica `fade-in` y `fade-out` arrastrando las manijas en los bordes de los clips.
- **Selección Múltiple y Efectos**:
  - Selecciona varios clips a la vez dibujando un cuadro de selección.
  - **Normalizar**: Ajusta el volumen de los clips seleccionados a un nivel estándar.
  - **Wavehammer (Distorsión)**: Aplica un efecto de distorsión a los clips seleccionados.
- **Exportación**:
  - Exporta la mezcla final como un archivo `.wav` de alta calidad.

## ¿Cómo Usarlo?

No se requiere instalación ni un servidor. Simplemente sigue estos pasos:

1.  Clona o descarga este repositorio.
2.  Abre el archivo `index.html` en un navegador web moderno (como Chrome, Firefox, Edge).
3.  ¡Comienza a editar!

## Tecnología Utilizada

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Web Audio API**: Para todo el procesamiento y la manipulación de audio.

## Estructura del Proyecto

Este proyecto es intencionadamente simple y está contenido en un solo archivo para facilitar su portabilidad y uso sin necesidad de un entorno de desarrollo complejo.

- `index.html`: Contiene toda la estructura (HTML), el estilo (CSS) y la lógica (JavaScript) de la aplicación.
- `js/` y `css/`: Estos directorios contienen archivos de una versión anterior o ideas de funcionalidades que **no están actualmente en uso** en la aplicación principal. La lógica de efectos y procesamiento de audio que se encuentra en estos archivos no está conectada a la interfaz.
