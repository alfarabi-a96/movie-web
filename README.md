# Movie Web

A modern web application for discovering and managing movies built with React, TypeScript, and Vite. Features real-time movie data from TMDB API, user authentication with Firebase, and multi-language support (English & Indonesian).

## Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3
- **State Management**:
  - React Context API (Auth, Theme, Favorites)
  - TanStack React Query (Server State)
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **API**: TMDB (The Movie Database)
- **Internationalization**: i18next
- **Routing**: React Router v7
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest + React Testing Library
- **HTTP Client**: Native Fetch API

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- NVM (Node Version Manager) - **recommended** for managing Node.js versions

### Node Version Management (NVM)

This project uses Node.js 18+. If you have NVM installed, you can automatically use the correct Node version:

```bash
nvm use
```

If you need to install NVM, visit: https://github.com/nvm-sh/nvm#installing-and-updating

**Don't have NVM?** You can still proceed without it, just make sure you have Node.js 18 or higher installed on your system.

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-web
   ```

2. **Use correct Node version (if using NVM)**

   ```bash
   nvm use
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Setup environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

## Running the Project

### Development Mode

```bash
npm run dev
```

The application will run at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

### Testing

```bash
npm run test
```

Run tests using Jest. The project uses Jest for unit and integration testing.

## Architecture Overview

### Authentication Flow

- User authentication via Firebase (email/password and Google OAuth)
- Protected routes using `ProtectedRoute` component
- User state managed in `AuthContext`
- Session persistence with Firebase

### State Management Strategy

- **Local/UI State**: React Context (Auth, Theme, Favorites)
- **Server State**: React Query (Movie data, caching, synchronization)
- **Persistent State**: Firestore (User favorites, preferences)

### Component Architecture

- **Page Components**: Full-page layouts in `pages/` folder
- **Reusable Components**: Shared UI components in `components/` folder
- **Custom Hooks**: Business logic in `hooks/` and `queries/` folders
- **Providers**: Context providers for global state in `context/` folder

### API Integration

- **TMDB API**: Movies data (popular, upcoming, top-rated, search)
- **Firebase**: User authentication and Firestore database
- **Fetch API**: Native JavaScript for HTTP requests
- **React Query**: Server state management and caching

### Internationalization (i18n)

- Support for English and Indonesian languages
- Language preference stored in browser
- Translation files in `locales/` folder
- Easy to add more languages

### Styling Approach

- **Component Styles**: CSS modules for scoped styling
- **Global Styles**: Global CSS in `styles/globals.css`
- **Responsive Design**: Mobile-first CSS approach
- **Icons**: SVG sprite for optimized icon management and performance

## Features

- 🎬 Browse popular, upcoming, and top-rated movies
- 🔍 Search movies by title
- ❤️ Add/remove movies from favorites
- 👤 User authentication (Email/Password & Google OAuth)
- 🌙 Light/Dark theme toggle
- 🌍 Multi-language support (English & Indonesian)
- 📱 Fully responsive design
- ⚡ High performance with Vite
- 🎯 Type-safe with TypeScript

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Help

For issues and questions, please open an issue in the repository.
