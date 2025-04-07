# Chatter

Chatter is a real-time chat application that allows users to communicate instantly with a modern and intuitive interface. The application consists of a TypeScript-based frontend and a Node.js backend.

## Project Overview

This repository contains both the frontend and backend components of the Chatter application:

- **Frontend**: A React application built with TypeScript, providing a modern UI for user interaction
- **Backend**: A Node.js/Express server handling authentication, data storage, and real-time communication

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
   yarn start
   # or
   npm start
   ```

   Start the frontend development server:
   ```bash
   cd public
   yarn start
   # or
   npm start
   ```

The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend at [http://localhost:5000](http://localhost:5000).

## Project Structure

```
chatter/
├── public/           # Frontend React application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── server/           # Backend Node.js application
│   ├── controllers/  # Request handlers
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── package.json  # Backend dependencies
└── README.md         # This file
```

## Documentation

For more detailed information about each component:

- [Frontend Documentation](public/README.md)
- [Backend Documentation](server/README.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.