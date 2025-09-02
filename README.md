# TrainerJs React Application

A modern React-based training timer application converted from the original vanilla JavaScript version.

## Features

- **Authentication System**: User registration and login with local storage
- **Timer Functionality**: Countdown timer with start, stop, and reset controls
- **Dynamic Button Generation**: Create customizable training buttons with countdown functionality
- **Responsive Design**: Mobile-friendly interface
- **Keyboard Shortcuts**: Space bar to start/stop, R to reset timer
- **Protected Routes**: Timer page requires authentication

## Demo Credentials

- **Username**: demo
- **Password**: demo123

## Technology Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Context API** for state management
- **CSS3** with modern design patterns
- **Local Storage** for data persistence

## Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx # Authentication page
│   ├── TimerPage.tsx   # Timer functionality
│   └── *.css          # Component-specific styles
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── *.css              # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

## Key Components

### LandingPage
- Handles user authentication (login/signup)
- Tab-based interface for switching between forms
- Form validation and error handling
- Demo credentials display

### TimerPage
- Protected route requiring authentication
- Timer controls with visual feedback
- Dynamic button generation system
- Keyboard shortcut support

### AuthContext
- Manages authentication state
- Handles user registration and login
- Provides authentication methods to components
- Persists user data in localStorage

## Features in Detail

### Timer System
- 10-second countdown timer
- Start, stop, and reset functionality
- Visual countdown display
- Audio beep on completion (configurable)

### Dynamic Buttons
- Generate custom number of training buttons
- Each button starts with count 5
- Click to activate and start countdown
- Visual feedback with color changes

### Authentication
- User registration with email validation
- Secure login system
- Session persistence
- Protected route access

## Keyboard Shortcuts

- **Space**: Start/Stop timer
- **R**: Reset timer

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

- Built with modern React patterns (hooks, context, functional components)
- TypeScript for type safety
- CSS modules for component-specific styling
- Local storage for data persistence
- No external dependencies beyond React ecosystem

## Future Enhancements

- User profile management
- Training session history
- Customizable timer durations
- Sound customization
- Data export functionality
- Cloud synchronization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository.