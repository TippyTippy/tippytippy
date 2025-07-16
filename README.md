# 🩺 TippyTippy: An Open Source Medical Journal

**TippyTippy** is a thoughtfully designed medical journal and healthcare assistant built with **Next.js**, **TypeScript**, and **shadcn/ui**. It aims to simplify personal health tracking by providing tools for journaling symptoms, setting medication reminders, and managing appointments—all with a focus on accessibility and intuitive design.

## 🚀 Features

- 📓 **Medical Journal**: Log health events, symptoms, and notes in a secure and organized format.
- 💊 **Medication Reminders**: Set recurring reminders with dosage instructions and scheduling.
- 📅 **Appointment Calendar**: Add, update, and track upcoming medical appointments.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **UI Framework**: [shadcn/ui](https://ui.shadcn.com/) - beautifully designed components built with Radix UI and Tailwind CSS
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) - Official Redux toolset for efficient state management
- **Database**: [Supabase](https://supabase.com/) + [PostgreSQL](https://www.postgresql.org/) - Open source Firebase alternative with powerful SQL database

## 📈 Roadmap

We're actively developing the following features:

- [ ] Calendar (Calendar)
- [ ] Appointment management
- [ ] Medication reminders with customizable schedules
- [ ] Notification support (Local + Push)
- [ ] Cloud sync via secure backend (e.g., Supabase)

## 🧪 Contributing

We welcome contributions from developers, designers, healthcare professionals, and accessibility advocates! If you’d like to collaborate:

1. Fork the repository
2. Clone your fork
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Submit a pull request!

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgements

TippyTippy was born from a personal need to support my loved ones—my parent during times when remembering medical appointments and timely medication became a challenge. This project is a reflection of that experience, blending empathy with technology to create a tool that offers clarity, care, and reliability in day-to-day healthcare tracking.

Created with ❤️ by [Dakshim Chhabra](https://github.com/dakshim).

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
