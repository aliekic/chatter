# Chatter Backend

This is the backend server for the Chatter application, built with Express.js and TypeScript.

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Create a `.env` file in the root directory with the following variables:
```
MONGO_URL=your_mongodb_connection_string
PORT=5000
```

3. Start the development server:
```bash
yarn dev
```

4. Build for production:
```bash
yarn build
```

5. Start the production server:
```bash
yarn start
```

## Project Structure

- `controllers/`: Contains the controller logic for handling requests
- `models/`: Contains the Mongoose models for the database
- `routes/`: Contains the route definitions
- `types/`: Contains TypeScript type definitions
- `index.ts`: The main entry point of the application

## TypeScript Configuration

The project uses TypeScript for type safety and better developer experience. The TypeScript configuration is defined in `tsconfig.json`.

### Converting JavaScript Files to TypeScript

To convert a JavaScript file to TypeScript:

1. Rename the file extension from `.js` to `.ts`
2. Add type annotations to variables, function parameters, and return types
3. Import/export using ES6 module syntax
4. Define interfaces for your data structures

### Example

JavaScript:
```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", userSchema);
```

TypeScript:
```typescript
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model<IUser>("Users", userSchema);
```

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/messages/:id`: Get messages for a user
- `POST /api/messages/addmsg`: Add a new message
- `GET /api/messages/getmsg`: Get messages between two users

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

## Available Scripts

- `yarn start` - Runs the server in development mode with nodemon
- `yarn test` - Runs tests (to be implemented)

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