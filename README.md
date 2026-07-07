# TaskFlow - Enterprise Task Management (Jira Clone)

A modern, high-performance enterprise task management platform inspired by Jira. Built with a sleek, glassmorphic UI, smooth micro-animations, and a robust backend. 

## ✨ Features

- **Interactive Kanban Board**: Fully functional drag-and-drop board for tracking tasks across customizable statuses (To Do, In Progress, Review, Testing, Done).
- **Task Management**: Create, edit, and delete tasks instantly. Customize priorities (Low, Medium, High) with dynamic color-coded UI indicators.
- **Dynamic Dashboards**: View project analytics, task velocity charts, and KPIs using Recharts.
- **Authentication System**: Secure JWT-based login and registration flow.
- **Profile Customization**: Manage your account settings, toggle email/push notifications, and dynamically generate profile avatars.
- **Modern UI/UX**: Premium design utilizing Tailwind CSS, Shadcn UI, glassmorphism (`backdrop-blur`), and the 'Outfit' font family.

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** (Build tool)
- **Tailwind CSS** + **Shadcn UI** (Styling & Components)
- **React Query** (Server state management)
- **@hello-pangea/dnd** (Drag and drop interactions)
- **Recharts** (Data visualization)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM**
- **SQLite** (Database)
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/preeti2428/Enterprise-Task-Management-JIRA-CLONE-.git
   cd "Enterprise-Task-Management-JIRA-CLONE-"
   ```

2. **Setup the Backend**
   ```bash
   cd server
   npm install
   
   # Setup Prisma Database
   npx prisma generate
   npx prisma db push
   
   # Start the backend server (runs on http://localhost:5005)
   npm run dev
   ```

3. **Setup the Frontend**
   Open a new terminal window:
   ```bash
   cd client
   npm install
   
   # Start the Vite development server
   npm run dev
   ```

4. **Open the App**
   Visit `http://localhost:5173` (or the port specified by Vite) in your browser.

## 📂 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Shadcn, Layouts)
│   │   ├── contexts/       # React Context providers (AuthContext)
│   │   ├── lib/            # Utilities and API configurations
│   │   └── pages/          # Main application pages (Board, Dashboard, Settings, etc.)
│   └── tailwind.config.js  # Tailwind design system tokens
│
└── server/                 # Backend Express application
    ├── prisma/             # Prisma schema and SQLite database
    └── src/
        ├── middleware/     # Express middlewares (JWT Auth)
        ├── routes/         # API endpoints (Auth, Tasks, Workspaces)
        └── index.ts        # Server entry point
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
