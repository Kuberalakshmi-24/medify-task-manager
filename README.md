# Task Manager App

A full-stack task management application with user authentication, built using modern web technologies.

## 📁 Project Structure

This is a monorepo containing both frontend and backend applications:

- **`/backend`** - Node.js/Express API server with PostgreSQL database
- **`/frontend`** - React application with Redux state management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- PostgreSQL database (Supabase recommended for easy setup)

### Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd task-manager-app2

   # Install backend dependencies
   cd backend && npm install && cd ..

   # Install frontend dependencies
   cd frontend && npm install && cd ..
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` in the backend directory
   - Update database connection string with your Supabase credentials

3. **Start the applications:**
   ```bash
   # Terminal 1: Start backend
   cd backend && npm start

   # Terminal 2: Start frontend
   cd frontend && npm start
   ```

4. **Access the app:**
   - Frontend: https://medify-task-manager.vercel.app
   - Backend API: https://medify-task-manager-1.onrender.com

## 🔧 Tech Stack

- **Frontend:** React, Redux Toolkit, React Router
- **Backend:** Node.js, Express, Sequelize ORM
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** JWT tokens


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
