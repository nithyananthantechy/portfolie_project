# Cybersecurity Portfolio

A secure, hacker-themed portfolio website built with Next.js, featuring terminal aesthetics, visitor authentication (SQLite/Prisma), and an admin dashboard.

## Features
- **Matrix Rain**: Custom Canvas-based background effect.
- **Terminal Aesthetics**: Green-on-black UI with typing animations.
- **Authentication**: JWT-based auth with Role-Based Access Control (RBAC).
- **Admin Dashboard**: View registered users and visitor stats.
- **Data Persistence**: SQLite database (via Prisma).

## Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM, Jose (JWT), Bcrypt
- **Database**: SQLite

## How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Database**:
   ```powershell
   # Windows (PowerShell)
   $env:DATABASE_URL="file:./dev.db"
   npx prisma generate
   npx prisma db push
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Access**:
   - Portfolio: http://localhost:3000
   - Admin Code: `admin_access_code_123` (Use when registering to get Admin role)

## GitHub Setup
To push this project to GitHub:
1. Create a new repository on GitHub.
2. Run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```
