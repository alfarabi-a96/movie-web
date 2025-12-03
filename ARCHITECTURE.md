# MovieFlix Architecture Documentation

## System Overview

MovieFlix is a React-based streaming movie experience application built with TypeScript, React Router, and modern CSS. The application follows clean architecture principles with clear separation of concerns.

## Application Structure

### Entry Point
- `src/main.tsx`: Application bootstrap, initializes i18n, renders root component

### Core Application
- `src/App.tsx`: Main component handling routing and context providers
  - Provides AuthProvider, ThemeProvider, FavoritesProvider
  - Defines all route configurations
  - Manages conditional header rendering

### Authentication Flow

```
┌─────────────────┐
│  Login/Register │
│     Pages       │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│  AuthContext        │
│  - login()          │
│  - register()       │
│  - loginWithSocial()│
│  - logout()         │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  localStorage       │
│  registeredUsers    │
│  currentUser        │
└─────────────────────┘
```

### State Management Architecture

#### Global State (Context API)
1. **AuthContext**
   - Stores: user object, authentication status
   - Methods: login, register, loginWithSocial, logout
   - Persistence: localStorage (registeredUsers, currentUser)

2. **ThemeContext**
   - Stores: current theme (light/dark)
   - Methods: toggleTheme
   - Persistence: localStorage (theme preference)

3. **FavoritesContext**
   - Stores: array of favorited movies
   - Methods: addFavorite, removeFavorite, isFavorite
   - Persistence: localStorage (favorites)

#### Component-Level State
- Form inputs: useState for form fields
- Loading/error states: useState for async operations
- UI toggles: useState for modals, dropdowns, etc.

### Component Hierarchy

```
App
├── ThemeProvider
│   └── AuthProvider
│       └── FavoritesProvider
│           ├── Header (if authenticated)
│           └── Routes
│               ├── LoginPage
│               ├── RegisterPage
│               ├── ProtectedRoute
│               │   ├── HomePage
│               │   ├── SearchPage
│               │   ├── MovieDetailsPage
│               │   └── FavoritesPage
│               └── MovieCard (in all pages)
```

### Styling Strategy

#### CSS Variable System
```
globals.css
├── Color Variables
│   ├── Light Theme Colors
│   └── Dark Theme Colors
├── Spacing System (0.25rem to 4rem)
├── Border Radius
├── Shadows
├── Typography
└── Transitions
```

#### Component Styling
- Each component has its own CSS file in `styles/components/`
- Page-specific styles in `styles/pages/`
- All styles use CSS variables for theming
- Mobile-first responsive design approach

#### Theme Implementation
```css
:root {
  /* Light theme (default) */
  --bg-primary: #ffffff;
  --text-primary: #1f2937;
}

[data-theme='dark'] {
  /* Dark theme */
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
}
```

### Data Flow

#### Movie Data
```
movieService
├── getPopularMovies() → Movie[]
├── getNowPlayingMovies() → Movie[]
├── getUpcomingMovies() → Movie[]
├── getTopRatedMovies() → Movie[]
├── searchMovies(query) → Movie[]
└── getMovieById(id) → Movie

Components using movie data
├── HomePage
├── SearchPage
├── MovieDetailsPage
└── MovieCard
```

#### Form Data
```
Component (useForm/useInput)
└── FormState
    ├── values: Record<string, string>
    ├── errors: Record<string, string>
    └── Methods
        ├── bind(field)
        ├── validate(validators)
        ├── reset()
        └── setFieldValue()
```

## Design Decisions

### 1. Context API over Redux
**Rationale**: For this application scale, Context API is sufficient and reduces complexity. Redux would be overkill.

### 2. CSS-in-CSS (not CSS-in-JS)
**Rationale**: 
- Smaller bundle size
- Better performance
- Easier to maintain
- Simpler onboarding for new developers

### 3. Mock Data Service
**Rationale**: No backend exists, service pattern allows easy replacement with real API

### 4. localStorage for Persistence
**Rationale**: Simple, works offline, no server required

### 5. Custom Form Hooks instead of Libraries
**Rationale**: Lightweight, custom requirements, educational value

## Type Safety

### Type Definitions (src/types/index.ts)
```typescript
// Domain Models
User, Movie, Cast, Crew, Genre

// API Types
ApiResponse<T>, PaginatedResponse<T>

// Context Types
AuthContextType, ThemeContextType, FavoritesContextType

// Form Types
LoginCredentials, SocialLoginData
```

## Internationalization

### i18n Setup (react-i18next)
```
src/locales/
├── en.json → English translations
├── id.json → Indonesian translations
└── i18n.ts → i18next configuration

Usage:
const { t, i18n } = useTranslation();
i18n.changeLanguage('id'); // Switch to Indonesian
```

### Translation Organization
```json
{
  "common": { /* shared terms */ },
  "auth": { /* auth-related */ },
  "movies": { /* movie-related */ },
  "favorites": { /* favorites-related */ },
  "search": { /* search-related */ },
  "errors": { /* error messages */ }
}
```

## Performance Optimizations

1. **Lazy Loading**: Images use `loading="lazy"` attribute
2. **Memoization**: Components use React.FC (functional component best practices)
3. **Code Splitting**: React Router enables automatic code splitting
4. **CSS Optimization**: Variables reduce duplicate styles
5. **Form Validation**: Immediate feedback reduces unnecessary submissions

## Accessibility Features

1. **Semantic HTML**: Proper heading hierarchy, button vs link usage
2. **ARIA Labels**: Form inputs, buttons have descriptive labels
3. **Color Contrast**: Meets WCAG AA standards
4. **Keyboard Navigation**: All interactive elements keyboard accessible
5. **Focus Management**: Visible focus indicators on interactive elements

## Error Handling Strategy

```
Try-Catch in async operations
│
├── Network/API errors
│   └── Display Error component with retry option
│
├── Validation errors
│   └── Display field-level error messages
│
└── User-facing errors
    └── Toast/Alert notifications
```

## Security Considerations

### Current Implementation (Demo)
- Passwords encoded in base64 (for demo only)
- Session stored in localStorage
- No HTTPS enforcement
- No CSRF protection

### Production Considerations
- Use proper password hashing (bcrypt)
- Implement secure session tokens (JWT)
- HTTPS-only
- CSRF tokens
- Input sanitization
- XSS prevention
- Rate limiting

## Future Architecture Improvements

1. **State Management**: Consider Redux Toolkit if complexity grows
2. **API Integration**: Replace mock service with real API calls
3. **Caching**: Implement React Query or SWR for data fetching
4. **Testing**: Add Jest/React Testing Library tests
5. **Performance**: Implement React.memo, useMemo where needed
6. **Error Tracking**: Add error logging service (Sentry)
7. **Analytics**: Add user behavior tracking

## Development Workflow

### Adding a New Page
1. Create `src/pages/NewPage.tsx`
2. Create `src/styles/pages/NewPage.css`
3. Add route in `App.tsx`
4. Add translations in `en.json` and `id.json`

### Adding a New Component
1. Create `src/components/NewComponent.tsx`
2. Create `src/styles/components/NewComponent.css`
3. Define props interface
4. Export from component file
5. Use in pages as needed

### Adding Translations
1. Add key-value pairs to both `en.json` and `id.json`
2. Use `useTranslation()` in component
3. Call `t('path.to.key')`

## Testing Strategy

### Unit Tests
- Components: Test rendering, props, events
- Hooks: Test state changes, validations
- Services: Test data transformation

### Integration Tests
- Full page flows
- Authentication flows
- Search and filtering

### E2E Tests (Future)
- User journeys
- Cross-browser compatibility
- Performance

## Build and Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
# Output: dist/ directory
```

### Deployment Targets
- Vercel (recommended for Next.js, works with Vite)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting

## Monitoring and Analytics (Future)

- User behavior tracking
- Error logging
- Performance monitoring
- Conversion tracking
