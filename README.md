# 🏛️ Discover Sevilla / Descubre Sevilla

A personalized discovery app for first-time visitors to Sevilla, helping travelers explore the city's most iconic sites with curated information and visit tracking. Designed for the AXA corporate event.

*Una aplicación de descubrimiento personalizada para visitantes primerizos en Sevilla, ayudando a los viajeros a explorar los sitios más emblemáticos de la ciudad con información curada y seguimiento de visitas. Diseñada para el evento corporativo de AXA.*

![Sevilla](https://img.shields.io/badge/City-Sevilla-orange) ![AXA Event](https://img.shields.io/badge/Event-AXA_Corporate-blue) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features / Características

### 🗺️ Site Discovery Grid
- **Curated Locations**: Discover Sevilla's must-visit sites including the Cathedral, Real Alcázar, Plaza de España, and more
- **Rich Metadata**: Each site displays visit duration, crowd levels, ratings, popularity tier, and must-see status
- **Responsive Layout**: Adapts from multi-column desktop view to single-column mobile layout

### ✅ Visit Tracking
- **Progress Monitoring**: Toggle visited/unvisited status for each site with persistent storage
- **Visual Feedback**: Clear visual distinction between visited and unvisited locations
- **Journey Completion**: Track your exploration progress through Sevilla's attractions

### 📍 Site Detail Information
- **Quick Decision-Making**: Essential planning information in a scannable format
- **Planning Details**: Visit duration estimates, crowd level indicators, and ratings at a glance
- **Intuitive Icons**: Clear visual hierarchy guides attention to the most important information

---

## 🎨 Design Philosophy / Filosofía de Diseño

### AXA Brand Guidelines Compliance
This application adheres to AXA's corporate brand guidelines:
- **Professional & Clean**: Minimalist aesthetic with intuitive navigation
- **Brand Colors**: Blue and white color scheme reflecting AXA's identity
- **Trustworthy**: Design conveys reliability consistent with AXA's brand values

### Sevilla-Inspired Design
The visual language captures the essence of Sevilla:
- **Warm Mediterranean Palette**: Terracotta and blue colors reflecting azulejo tiles and sun-drenched architecture
- **Sophisticated Typography**: Playfair Display for elegant headers, Inter for modern clarity
- **Inviting Aesthetic**: Evokes the spirit and energy of Sevilla, encouraging exploration

### Color Palette
- **Primary**: Rich Terracotta `oklch(0.62 0.15 35)` - Spanish heritage and warmth
- **Secondary**: Warm Cream `oklch(0.96 0.02 85)` - Soft, welcoming backgrounds
- **Accent**: Deep Blue `oklch(0.45 0.12 240)` - Mediterranean river and tiles
- **Interactive**: Vibrant Amber `oklch(0.75 0.18 60)` - Spanish golden hour
- All color pairings meet WCAG AA accessibility standards

---

## 🛠️ Technology Stack / Stack Tecnológico

### Core Framework
- **React 19** - Modern UI library with latest features
- **TypeScript 5.7** - Type-safe development
- **Vite 6** - Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled component primitives
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons

### State & Data Management
- **React Hooks** - Modern state management
- **Local Storage** - Visit tracking persistence
- **TanStack Query** - Async state management

### Development Tools
- **ESLint** - Code quality and consistency
- **Playwright** - End-to-end testing
- **PostCSS** - CSS processing and optimization

---

## 🚀 Getting Started / Comenzar

### Prerequisites / Requisitos Previos
- **Node.js** 18+ 
- **npm** or **pnpm** package manager

### Installation / Instalación

```bash
# Clone the repository / Clonar el repositorio
git clone https://github.com/your-org/discover-sevilla.git

# Navigate to project directory / Navegar al directorio del proyecto
cd discover-sevilla

# Install dependencies / Instalar dependencias
npm install

# Start development server / Iniciar servidor de desarrollo
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📜 Available Scripts / Scripts Disponibles

### Development / Desarrollo
```bash
npm run dev          # Start development server with hot reload
                     # Iniciar servidor de desarrollo con recarga en caliente

npm run preview      # Preview production build locally
                     # Vista previa de la compilación de producción
```

### Build / Compilación
```bash
npm run build        # Build for production
                     # Compilar para producción

npm run optimize     # Optimize dependencies
                     # Optimizar dependencias
```

### Code Quality / Calidad de Código
```bash
npm run lint         # Run ESLint for code quality checks
                     # Ejecutar ESLint para verificar calidad del código
```

### Utilities / Utilidades
```bash
npm run kill         # Kill process on port 5000 (cleanup)
                     # Eliminar proceso en puerto 5000 (limpieza)
```

---

## 📂 Project Structure / Estructura del Proyecto

```
discover-sevilla/
├── src/
│   ├── components/        # Reusable UI components / Componentes reutilizables
│   ├── data/             # Site data and content / Datos de sitios y contenido
│   ├── hooks/            # Custom React hooks / Hooks personalizados de React
│   ├── lib/              # Utility functions / Funciones utilitarias
│   ├── styles/           # Global styles and themes / Estilos globales y temas
│   ├── types/            # TypeScript type definitions / Definiciones de tipos
│   ├── App.tsx           # Main application component / Componente principal
│   └── main.tsx          # Application entry point / Punto de entrada
├── public/               # Static assets / Activos estáticos
├── PRD.md               # Product Requirements Document / Documento de requisitos
├── theme.json           # Theme configuration / Configuración de tema
├── tailwind.config.js   # Tailwind configuration / Configuración de Tailwind
├── vite.config.ts       # Vite configuration / Configuración de Vite
└── package.json         # Dependencies and scripts / Dependencias y scripts
```

---

## 🎯 Development Workflow / Flujo de Trabajo

### Component Development
1. Create components in `src/components/` following existing patterns
2. Use Radix UI primitives for accessibility
3. Style with Tailwind CSS utilities
4. Implement responsive design (mobile-first approach)

### State Management
- **Visit Tracking**: Managed via custom hooks with localStorage persistence
- **Component State**: Local state with React hooks
- **Global State**: Context API for cross-component data

### Code Style
- **Bilingual Comments**: All code comments in English and Spanish
- **TypeScript First**: Strong typing for all components and functions
- **Accessibility**: WCAG AA compliance, semantic HTML, ARIA labels

---

## 📱 Browser Support / Compatibilidad de Navegadores

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

---

## 🌐 Localization / Localización

The app supports bilingual content:
- **English**: Primary language for international visitors
- **Spanish**: Local language for Spanish-speaking users

Content is structured to easily add more languages in the future.

---

## 📄 License / Licencia

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The Spark Template files and resources from GitHub are licensed under the terms of the MIT License, Copyright GitHub, Inc.

---

## 👥 AXA Corporate Event

This application was specifically designed for an AXA corporate event to provide attendees with an enhanced experience exploring Sevilla. The design incorporates AXA's brand guidelines while celebrating the unique character of Sevilla.

---

## 📞 Support / Soporte

For questions or issues related to this project:
- Review the [PRD.md](PRD.md) for detailed feature specifications
- Check existing issues in the repository
- Reach out to the development team

---

**Built with ❤️ for Sevilla explorers / Construido con ❤️ para exploradores de Sevilla**
