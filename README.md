# 🌍 EduAtlas

**Empowering Students Worldwide.**

EduAtlas is a modern scholarship platform that bridges the gap between students, universities, and sponsors. It provides a seamless way to discover financial aid, manage scholarship applications, and empower the next generation of global talent.

---

## ✨ Key Features

- **🔍 Smart Discovery**: Filter thousands of scholarships by country, degree level, and funding amount.
- **🏛️ University Portals**: Dedicated dashboards for institutions to manage their scholarship offerings.
- **💰 Sponsor Management**: Tools for sponsors to create and track educational funding.
- **🛡️ Secure Auth**: Robust authentication flow powered by [Better Auth](https://better-auth.com) and [Resend](https://resend.com).
- **📱 Responsive Design**: A stunning, modern interface built with Tailwind CSS 4 and Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Auth**: [Better Auth](https://better-auth.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Email**: [Resend](https://resend.com/) & [React Email](https://react.email/)

## 🚀 Getting Started

### Prerequisites

- Node.js / Bun
- PostgreSQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/eduatlas.git
   cd eduatlas
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your credentials (see `.env.example` if available).

4. **Initialize the database:**
   ```bash
   bun x prisma generate
   bun run db:create-verification # For Better Auth verification table
   bun run db:migrate # Execute migrations
   ```

5. **Seed the database (Optional):**
   ```bash
   bun x prisma db seed
   ```

6. **Run the development server:**
   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see your local instance of EduAtlas!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by the EduAtlas Team.
