# Portafolio — Andrés Felipe Flórez Vargas

Portafolio personal construido como SPA (Single Page Application) con HTML, CSS y JavaScript vanilla. Sin frameworks, sin bundler, sin backend.

## Estructura

```
Portafolio/
├── index.html        # Página única con las 8 secciones
├── css/
│   └── styles.css    # Estilos organizados por sección (~44 KB)
└── js/
    └── main.js       # Lógica interactiva modular (~16 KB)
```

## Secciones

| Sección | Descripción |
|---|---|
| **Hero** | Typewriter animado, CTA y scroll indicator |
| **Sobre mí** | Bio, contadores animados y descarga de CV |
| **Stack** | Tabs por categoría (Frontend, Backend, Herramientas) |
| **Proyectos** | Cards con filtros y efecto tilt 3D |
| **Experiencia** | Timeline vertical interactivo |
| **Contacto** | Formulario con validación + fallback `mailto:` |

## Funcionalidades

- **Tema oscuro/claro** — persistido en `localStorage`, activado por `[data-theme]` en `<html>`
- **Cursor personalizado** — deshabilitado automáticamente en dispositivos táctiles
- **Scroll spy** — resaltado de link activo en el navbar según sección visible
- **Typewriter** — ciclo multi-frase con efecto de escritura y borrado
- **Contadores animados** — se disparan al entrar al viewport (IntersectionObserver)
- **Filtros de proyectos** — por categoría con transición de opacidad
- **Tilt 3D** — en cards de proyectos (Vanilla Tilt), deshabilitado en touch
- **Lazy loading** — imágenes con `data-src` cargadas al entrar al viewport
- **Formulario** — validación en tiempo real, abre cliente de correo al enviar

## Dependencias CDN

| Librería | Uso |
|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | Utilidades complementarias |
| [Lucide Icons](https://lucide.dev/) | Iconografía SVG |
| [AOS](https://michalsnik.github.io/aos/) | Animaciones al hacer scroll |
| [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/) | Efecto tilt 3D en cards |
| [Google Fonts](https://fonts.google.com/) | Inter · Space Grotesk · JetBrains Mono |

## Paleta de colores

| Variable | Valor | Uso |
|---|---|---|
| `--accent-blue` | `#7A9B2F` | Acento principal (verde oliva) |
| `--accent-purple` | `#4D6E20` | Acento secundario (verde oliva oscuro) |
| `--bg-primary` | `#0A0E1A` | Fondo principal (modo oscuro) |
| `--text-primary` | `#F8FAFC` | Texto principal |

## Despliegue

El proyecto es 100% estático. Se puede publicar directamente arrastrando la carpeta a:

- **Netlify** — drag & drop en [app.netlify.com](https://app.netlify.com)
- **Vercel** — `vercel --prod` o importando el repositorio
- **GitHub Pages** — activando Pages sobre la rama `main`

No requiere paso de build ni servidor.

## Pendiente

- Agregar `assets/CV_Andres_Florez.pdf` para que el botón de descarga funcione.

## Contacto

**Andrés Felipe Flórez Vargas**  
[LinkedIn](https://www.linkedin.com/in/andr%C3%A9s-florez-vargas-a438783aa/) · noxustrifarix11@gmail.com
