# Bovaro Real Estate

A premium, multi-project real estate web application built with Next.js, TypeScript, Tailwind CSS, GSAP, and Three.js / React Three Fiber.

---

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation & Interactions:**
  - [GSAP](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
  - [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics & Rendering:**
  - [Three.js](https://threejs.org/)
  - [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
  - [@react-three/drei](https://github.com/pmndrs/drei)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linting & Code Quality:** [ESLint](https://eslint.org/) (flat config with Next.js core web vitals and TypeScript rules)
- **Package Manager:** [npm](https://www.npmjs.com/)

---

## Project Architecture

```text
src/
├── app/                  # Next.js App Router (pages, layouts, routes)
├── components/           # Reusable UI elements (buttons, inputs, cards, dialogs)
├── features/             # Feature-specific modules and components
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities, library helpers, and configurations
├── data/                 # Static data and project schemas
├── types/                # TypeScript type definitions and interfaces
└── styles/               # Global and modular CSS stylesheets

public/
├── branding/             # Bovaro brand assets (logos, badges)
├── fonts/                # Custom typography and font assets
└── projects/             # Media assets organized per development
    ├── bugatti/
    │   ├── images/
    │   └── videos/
    ├── mercedes-benz/
    │   ├── images/
    │   └── videos/
    ├── emaar-oasis/
    │   ├── images/
    │   └── videos/
    ├── oystra/
    │   ├── images/
    │   └── videos/
    └── sobha-city/
        ├── images/
        └── videos/
```

---

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm (v10+ recommended)

### 1. Installation

Clone the repository and install all dependencies:

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment configuration file to create your local environment:

```bash
cp .env.example .env.local
```

### 3. Development Server

Start the Next.js local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the Next.js development server |
| `npm run build` | Builds the application for production deployment |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to validate code quality and Next.js best practices |

---

## Deployment

The application is configured and ready for seamless deployment on [Vercel](https://vercel.com/):

1. Push your changes to your Git repository.
2. Import the project into the Vercel dashboard.
3. Vercel automatically detects Next.js settings and handles building and optimization.
