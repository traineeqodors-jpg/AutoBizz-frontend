# 🚀 AutoBizz Frontend

**AutoBizz** is a modern, AI-powered business automation platform frontend built with **Next.js 16** and **React 19**. It provides a comprehensive dashboard for lead management, employee administration, AI receptionist integration, SOP generation, call logs, and real-time analytics.

> ℹ️ **Note:** This repository contains only the **frontend** application. It communicates with a backend API via REST and WebSocket connections.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [📦 Available Scripts](#-available-scripts)
- [🔐 Authentication](#-authentication)
- [🌐 State Management](#-state-management)
- [🎨 Styling & UI](#-styling--ui)
- [📝 License](#-license)

---

## ✨ Features

| Module                     | Description                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 🏠 **Landing Page**        | Public marketing page with hero section, product showcase, process flow, client reviews, and contact form. |
| 🔐 **Authentication**      | Business & Employee login, Google OAuth, password reset, and employee setup flow.                          |
| 📊 **Dashboard**           | Organization overview with analytics, leads summary, and support cards.                                    |
| 👥 **Lead Management**     | View, filter, and manage sales leads with responsive table and mobile views.                               |
| 🧑‍💼 **Employee Management** | Add, view, filter, and manage employees within the organization.                                           |
| 📞 **Call Logs**           | Detailed call history with search, filters, and modal details.                                             |
| 📅 **Calendar**            | Meeting scheduling and calendar integration.                                                               |
| 📄 **Documents**           | Upload, search, and manage business documents.                                                             |
| 🎥 **SOP Generation**      | AI-powered SOP video generation with script creation and avatar selection.                                 |
| 👤 **Profile**             | Manage user details, organization info, and update password.                                               |
| 🌙 **Dark/Light Mode**     | Theme switching support via `next-themes`.                                                                 |
| 🔌 **Real-time Updates**   | Live notifications and data sync via Socket.IO.                                                            |

---

## 🛠 Tech Stack

| Technology              | Version | Purpose                      |
| ----------------------- | ------- | ---------------------------- |
| **Next.js**             | 16.2.3  | React Framework (App Router) |
| **React**               | 19.2.4  | UI Library                   |
| **Redux Toolkit**       | 2.11.2  | Global State Management      |
| **Tailwind CSS**        | 4.x     | Utility-first Styling        |
| **Framer Motion**       | 12.x    | Animations & Transitions     |
| **Socket.IO Client**    | 4.8.3   | Real-time Communication      |
| **Chart.js**            | 4.5.1   | Data Visualization           |
| **React Big Calendar**  | 1.19.4  | Calendar Component           |
| **Next Themes**         | 0.4.6   | Theme Provider               |
| **React Hot Toast**     | 2.6.0   | Toast Notifications          |
| **@react-oauth/google** | 0.13.5  | Google OAuth Integration     |
| **Lucide React**        | 1.8.0   | Icon Library                 |
| **Moment.js**           | 2.30.1  | Date Formatting              |

---

## 📁 Project Structure

```
autobizz-nextjs/
├── public/                        # Static assets (images, SVGs, logos)
├── src/
│   ├── Json data/                 # Static JSON data files
│   │   ├── businesses.json
│   │   ├── country.json
│   │   ├── data.js
│   │   └── videoAvatar.json
│   │
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Auth route group
│   │   │   ├── login/             # Business & Employee login
│   │   │   ├── register/          # Registration
│   │   │   └── resetpassword/     # Reset password (with token)
│   │   │
│   │   ├── (employee-registartion)/
│   │   │   └── setup-password/    # Employee first-time setup
│   │   │
│   │   ├── (landing)/             # Public landing page
│   │   │   ├── components/        # Landing sections
│   │   │   └── page.jsx
│   │   │
│   │   └── org/                   # Protected organization routes
│   │       ├── dashboard/         # Main dashboard
│   │       ├── leads/             # Lead management
│   │       ├── employees/         # Employee management
│   │       ├── callLogs/          # Call logs
│   │       ├── calendar/          # Calendar view
│   │       ├── documents/         # Document management
│   │       ├── sop/               # SOP video generation
│   │       ├── profile/           # User & org profile
│   │       └── layout.js          # Org layout with sidebar/navbar
│   │
│   ├── components/                # Shared components
│   │   ├── AuthGuard.jsx          # Route protection
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MobileSideBar.jsx
│   │   ├── Footer.jsx
│   │   ├── SocketProvider.jsx     # Socket.IO context
│   │   ├── ToasterProvider.jsx
│   │   ├── AnimatedWrapper.jsx
│   │   └── ui/                    # Reusable UI components
│   │       ├── ReusableTable
│   │       ├── DeleteDialog
│   │       ├── DocumentUploadDialog
│   │       ├── GenerateSOP
│   │       ├── GenerateScript
│   │       ├── GenerateVideo
│   │       ├── AvatarSelection
│   │       ├── CustomToast
│   │       └── ThemeSwitch
│   │
│   ├── features/                  # Redux slices
│   │   ├── slices/
│   │   │   ├── userSlice.js
│   │   │   ├── leadSlice.js
│   │   │   ├── employeeSlice.js
│   │   │   ├── callLogSlice.js
│   │   │   ├── meetingSlice.js
│   │   │   ├── documentSlice.js
│   │   │   ├── orgDetailsSlice.js
│   │   │   ├── scriptGenerationSlice.js
│   │   │   ├── videoGenerationSlice.js
│   │   │   ├── resetPasswordSlice.js
│   │   │   └── contactUsSlice.js
│   │   └── extraSlice/
│   │       └── leadFilterSlice.js
│   │
│   ├── lib/
│   │   ├── store.js               # Redux store configuration
│   │   └── socket.js              # Socket.IO client instance
│   │
│   └── redux/
│       └── Providers.jsx          # Redux + Theme providers
```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/traineeqodors-jpg/AutoBizz-frontend.git
   cd autobizz-nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Backend API Base URL
NEXT_PUBLIC_BACKEND_URL=your_backend_url_here

# Twilio AI Support Phone Number
NEXT_PUBLIC_AI_SUPPORT_NUMBER=your_twilio_number_here

# Google OAuth Client ID
NEXT_PUBLIC_CLIENT_ID=your_google_client_id_here
```

> ⚠️ All environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible on the client side.

### Running the App

- **Development Mode**

  ```bash
  npm run dev
  ```

  Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Production Build**

  ```bash
  npm run build
  npm run start
  ```

---

## 📦 Available Scripts

| Script      | Command         | Description                           |
| ----------- | --------------- | ------------------------------------- |
| Development | `npm run dev`   | Start development server on port 3000 |
| Build       | `npm run build` | Create optimized production build     |
| Start       | `npm run start` | Start production server               |
| Lint        | `npm run lint`  | Run ESLint checks                     |

---

## 🔐 Authentication

The application supports multiple authentication flows:

- **Business Login** — For organization owners/admins
- **Employee Login** — For employees invited by the organization
- **Google OAuth** — Social login via `@react-oauth/google`
- **Password Reset** — Token-based reset flow (`/resetpassword/[token]`)
- **Employee Setup** — First-time password setup for new employees (`/setup-password`)

Route protection is enforced using the `AuthGuard` component.

---

## 🌐 State Management

- **Redux Toolkit** is used for global state management.
- Slices are organized under `src/features/slices/`.
- The Redux store is configured in `src/lib/store.js`.
- Providers are wrapped in `src/redux/Providers.jsx`.

---

## 🎨 Styling & UI

- **Tailwind CSS 4** for utility-first styling.
- **Framer Motion** for smooth animations and transitions.
- **Lucide React & React Icons** for consistent iconography.
- **Next Themes** for dark/light mode support.
- Custom UI components are located in `src/components/ui/`.

---

## 📝 License

This project is private and proprietary. All rights reserved © AutoBizz.

---

## 📞 Support

For any issues or questions, please contact the development team or refer to the internal documentation.

```

```
