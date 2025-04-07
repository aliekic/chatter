# Chatter - Backend

This is the backend part of the Chatter application, a real-time chat application built with Node.js and Express. It provides a robust API and real-time communication capabilities using Socket.io.

## Features

- 🔐 Secure user authentication with JWT
- 💬 Real-time messaging with Socket.io
- 👥 User management and profiles
- 📊 MongoDB database integration
- 🔄 RESTful API endpoints
- 🔒 Secure password hashing with bcrypt

## Tech Stack

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

1. Install dependencies:
```bash
yarn install
# or
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URL=your_mongodb_connection_string
```

3. Start the development server:
```bash
yarn start
# or
npm start
```

The server will be running at [http://localhost:5000](http://localhost:5000).

## Available Scripts

- `yarn start` - Runs the server in development mode with nodemon
- `yarn test` - Runs tests (to be implemented)

## Project Structure

```
server/
├── controllers/     # Request handlers
├── models/          # Mongoose models
├── routes/          # API routes
├── index.js         # Main server file
├── .env             # Environment variables
└── package.json     # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/setavatar/:id` - Set user avatar

### Messages
- `POST /api/messages/addmsg` - Add a new message
- `POST /api/messages/getmsg` - Get messages between users

## Socket.io Events

- `add-user` - Add a user to the online users map
- `send-msg` - Send a message to a specific user
- `msg-recieve` - Receive a message from another user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 