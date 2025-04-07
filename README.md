# Chatter

Chatter is a real-time chat application that allows users to communicate instantly with a modern and intuitive interface. The application consists of a TypeScript-based frontend and a TypeScript-based backend.

## Project Overview

This repository contains both the frontend and backend components of the Chatter application:

- **Frontend**: A React application built with TypeScript, providing a modern UI for user interaction
- **Backend**: A Node.js/Express server built with TypeScript, handling authentication, data storage, and real-time communication

## Features

- 🔐 Secure user authentication
- 💬 Real-time messaging
- 👥 User profiles and avatars
- 🎨 Modern and responsive UI
- 🌙 Dark/Light mode support
- 📱 Mobile-friendly design
- 📊 MongoDB database integration
- 🔄 RESTful API endpoints

## Tech Stack

### Frontend
- React.js
- TypeScript
- Socket.io-client
- Axios
- React Router
- Context API
- CSS Modules
- Styled Components

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- Socket.io
- JWT for authentication
- bcrypt for password hashing
- cors for cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chatter.git
cd chatter
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd server
yarn install
# or
npm install

# Install frontend dependencies
cd ../public
yarn install
# or
npm install
```

3. Set up environment variables:

   For the backend (server/.env):
   ```
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   ```

   For the frontend (public/.env):
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the servers:

   Start the backend server:
   ```bash
   cd server
   yarn dev
   # or
   npm run dev
   ```

   Start the frontend development server:
   ```bash
   cd public
   yarn start
   # or
   npm start
   ```

5. Build for production:

   Build the backend:
   ```bash
   cd server
   yarn build
   # or
   npm run build
   ```

   Build the frontend:
   ```bash
   cd public
   yarn build
   # or
   npm run build
   ```

## Project Structure

### Backend
```
server/
├── controllers/     # Request handlers
├── models/          # Mongoose models
├── routes/          # API routes
├── types/           # TypeScript type definitions
├── index.ts         # Main server file
├── tsconfig.json    # TypeScript configuration
├── .env             # Environment variables
└── package.json     # Dependencies and scripts
```

### Frontend
```
public/
├── src/
│   ├── components/  # React components
│   ├── context/     # React context providers
│   ├── pages/       # Page components
│   ├── styles/      # CSS styles
│   ├── types/       # TypeScript type definitions
│   ├── utils/       # Utility functions
│   ├── App.tsx      # Main App component
│   └── index.tsx    # Entry point
├── public/          # Static assets
└── package.json     # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/setavatar/:id` - Set user avatar
- `GET /api/auth/logout/:id` - Logout a user
- `GET /api/auth/allusers/:id` - Get all users except the current user

### Messages
- `POST /api/messages/addmsg` - Add a new message
- `POST /api/messages/getmsg` - Get messages between users

## Socket.io Events

- `add-user` - Add a user to the online users list
- `send-msg` - Send a message to a specific user
- `msg-recieve` - Receive a message from another user

## License

This project is licensed under the MIT License - see the LICENSE file for details.