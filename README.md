# 💚 Luana cumple 13

Página web de cumpleaños para los 13 años de Luana. Tiene una apertura estilo opening de anime con cuatro mundos: **Zombies**, **Descendientes**, **Billie Eilish** y **Sabrina Carpenter**. Incluye mensajes de los personajes que se escriben solos, su canción favorita, un mensaje de voz, el pastel con 13 velas, 13 deseos, un mural de fotos de la familia y una carta.

> Página de fan sin afiliación oficial. Los mensajes de artistas reales aparecen como "Si … te escribiera" (dedicatorias de fan). Las fotos de los capítulos vienen de Wikimedia Commons con licencia libre, y sus créditos se muestran en el pie de página.

## Características

| Sección | Qué hace |
| --- | --- |
| **Intro** | Regalo para abrir sobre un fondo de backrooms. Zed manda besos animados. Al abrirlo empieza la música y el confeti |
| **Opening** | Cuatro franjas neón inclinadas, una por mundo, con globos de diálogo, onomatopeyas y el nombre de Luana |
| **Mensaje de voz** | Reproductor con ondas. Mientras suena, la canción favorita baja de volumen |
| **Canción favorita** | *Someday* de ZOMBIES completa (MP3 propio). Arranca al abrir el regalo |
| **Capítulos** | Un capítulo por mundo con mensajes que se escriben solos, su canción completa lista para reproducir (MP3 propio) y fondos de pantalla descargables |
| **Pastel** | 13 velas que se apagan tocándolas. Al apagarlas todas sale confeti |
| **Familia** | Mural de fotos tipo polaroid con visor a pantalla completa |
| **Carta** | Carta final firmada |

## Inicio rápido

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm test       # tests unitarios (Vitest)
pnpm build      # build de producción en dist/
```

## Personalización

Todos los textos están en **`src/config/birthday.config.ts`**: nombre, edad, mensajes de cada personaje, canción favorita, deseos, textos de la familia y la carta.

### Fotos

Pon las fotos en la carpeta que corresponda y aparecen solas en la página. No hay que tocar código.

```
src/photos/
├── intro/          → zed.jpg, invitado.jpg y backrooms.jpg de la pantalla del regalo
├── zombies/        → 01, 02… fondos de pantalla · fondo · zed · addison
├── descendientes/  → 01, 02… · mal · evie
├── billie/         → 01, 02… · fondo · billie
├── sabrina/        → 01, 02… · fondo · sabrina
├── familia/        → 01, 02… mural de la familia
└── luana/          → retrato (foto de la portada) · 01, 02… galería "Tus mejores momentos"
```

- Formatos: `.jpg`, `.jpeg`, `.png`, `.webp` y `.avif`.
- Las fotos numeradas (`01.jpg`, `02.jpg`, `10.jpg`…) se muestran en orden.
- Las fotos con nombre (`fondo`, `zed`, `retrato`…) se usan para lugares específicos.
- Recomendado: menos de 1 MB y unos 1600 px de lado, para que cargue rápido en el celular.
- Si una galería no tiene fotos, no aparece.

### Mensaje de voz

Pon tu grabación en `src/audio/voz/`: un solo archivo `.mp3`, `.m4a`, `.wav`, `.ogg` o `.aac`. Entonces la página:

- Muestra la tarjeta **"Mensaje de voz para ti"** debajo de la portada.
- Lo reproduce solo al abrir el regalo.
- Baja las canciones al 20 % mientras hablas y después las vuelve a subir.

Si la carpeta está vacía, la tarjeta no aparece. Usa `.mp3` o `.m4a`, porque `.ogg` no suena en iPhones viejos.

### Canciones

Las canciones son archivos MP3 propios dentro de `src/audio/canciones/` y suenan completas con el reproductor de la página. No usan YouTube ni Spotify.

```
src/audio/canciones/
├── someday.mp3               → canción favorita (arranca al abrir el regalo)
├── birds-of-a-feather.mp3    → capítulo Billie Eilish
└── please-please-please.mp3  → capítulo Sabrina Carpenter
```

En `birthday.config.ts`, cada canción indica su archivo por nombre, sin la extensión:

```ts
favoriteSong: { audio: 'someday', title: 'Someday', artist: '…' },
song: { title: 'Birds of a Feather', artist: 'Billie Eilish', audio: 'birds-of-a-feather' },
```

- Solo suena una canción a la vez: al darle play a una, las demás se pausan.
- Mientras suena el mensaje de voz, las canciones bajan al 20 %.
- Si falta el archivo, esa tarjeta de canción no aparece.

## Arquitectura

```
src/
├── config/          # Configuración tipada, índice de fotos y créditos
├── core/            # Helpers del DOM
├── photos/          # Fotos por sección (se detectan solas con import.meta.glob)
├── audio/
│   ├── voz/         # Mensaje de voz
│   └── canciones/   # Canciones en MP3
├── features/
│   ├── cake/        # Pastel y velas
│   ├── chapters/    # Capítulos por mundo y mensajes que se escriben solos
│   ├── credits/     # Créditos de las fotos
│   ├── effects/     # Estrellas, confeti y animaciones al hacer scroll
│   ├── family/      # Mural de la familia y galería de Luana
│   ├── gallery/     # Botones de foto reutilizables
│   ├── hero/        # Opening de cuatro franjas
│   ├── intro/       # Pantalla del regalo
│   ├── letter/      # Carta
│   ├── lightbox/    # Visor a pantalla completa
│   ├── music/       # Reproductor de canciones y control de una canción a la vez
│   ├── voice/       # Mensaje de voz
│   └── wishes/      # 13 deseos
└── styles/          # Estilos por sección y ajustes para celular
```

- **Vite + TypeScript estricto**, sin framework.
- La lógica pura (índice de fotos, formato de tiempo, estado del pastel y validación de la configuración) está separada del DOM y tiene tests.
- Diseño responsive revisado en 360 px y 390 px. Accesible: navegación por teclado, `aria-*` y respeta `prefers-reduced-motion`.

## Ramas

| Rama | Uso | ¿Se publica? |
| --- | --- | --- |
| `develop` | Trabajo diario. CI corre tests y build | No |
| `main` | Producción | Sí, en GitHub Pages |

## Despliegue en GitHub Pages

El workflow `.github/workflows/deploy.yml` corre los tests, hace el build y publica en cada push a `main`.

1. Sube el repo a GitHub.
2. Ve a **Settings → Pages → Source: GitHub Actions**.
3. Haz push a `main`.
