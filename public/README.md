# Chatter - Frontend

This is the frontend part of the Chatter application, a real-time chat application built with React and TypeScript. It provides a modern and intuitive user interface for seamless communication.

## Features

- 🔐 Secure user authentication
- 💬 Real-time messaging
- 👥 User profiles and avatars
- 🎨 Modern and responsive UI
- 🌙 Dark/Light mode support
- 📱 Mobile-friendly design
- ✨ TypeScript support for better type safety

## Tech Stack

- React.js
- TypeScript
- Socket.io-client
- Axios
- React Router
- Context API
- CSS Modules
- Styled Components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see main README for setup)

### Installation

1. Install dependencies:
```bash
yarn install
# or
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
yarn start
# or
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `yarn start` - Runs the app in development mode
- `yarn build` - Builds the app for production
- `yarn test` - Launches the test runner
- `yarn eject` - Ejects from Create React App

## Project Structure

```
public/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React Context providers
│   ├── pages/         # Page components
│   ├── services/      # API and socket services
│   ├── styles/        # Global styles and themes
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Helper functions
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## TypeScript

This project uses TypeScript for better type safety and developer experience. Key TypeScript features include:

- Strong typing for all components and functions
- Interface definitions for data models
- Type checking for API responses
- Enhanced IDE support and autocompletion

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
