# Ego Wiki

<div align="center">

![Ego Wiki](https://img.shields.io/badge/Ego--Wiki-Official-7B00FF?style=for-the-badge&logo=bookstack&logoColor=white)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

**The Official Documentation Hub for EgoSMP** 📚

A modern, high-performance wiki built to provide comprehensive guides, item statistics, and gameplay mechanics for the EgoSMP server.
Featuring a dynamic UI, real-time data integration, and seamless animations.

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Contributing](#contributing) • [Support](#support)

</div>

## Features

- 🎨 **Modern UI/UX** — Glassmorphism and Neon aesthetics.
- ⚡ **High Performance** — Powered by **Next.js 16** and **React 19**.
- 🎭 **Smooth Animations** — Integrated with **AnimeJS** and **Framer Motion**.
- 🔐 **Discord Auth** — Secure login via **NextAuth** for exclusive content.
- 🌍 **i18n Support** — English (EN) and Vietnamese (VI).
- 📱 **Responsive** — Optimized for all devices.

## Installation

### Prerequisites
- Node.js 20+
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/EgoSMP/ego-wiki.git
   cd ego-wiki
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create `.env.local` based on `.env.example`:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   AUTH_SECRET=your_secret
   DISCORD_CLIENT_ID=your_id
   DISCORD_CLIENT_SECRET=your_secret
   DISCORD_GUILD_ID=your_guild_id
   DISCORD_WEBHOOK_URL=your_webhook
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Core**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & [AnimeJS](https://animejs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Content**: [MDX](https://mdxjs.com/) & [Gray-Matter](https://github.com/jonschlinkert/gray-matter)

## Support

For support, join our [Discord Server](https://discord.gg/jRqnNbupj4).

---

<div align="center">
  <sub>Built with ❤️ by the EgoSMP Team</sub>
</div>
