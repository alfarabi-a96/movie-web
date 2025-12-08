# Alpha Movie - Complete Setup and Testing Guide

## ✅ Project Status: COMPLETE

All features have been successfully implemented and the application is ready for use.

## 🚀 Quick Start

### 1. Development Server

The development server is currently running on:

```
http://localhost:5174/
```

### 2. Running the App Locally

```bash
# Navigate to project directory
cd d:\Code\movie-web

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173 (or the displayed port)
```

### 3. Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📋 Testing the Application

### 1. Registration Flow

1. **Visit Registration Page**: Go to `/register`
2. **Fill Form**:
   - Name: Any name (e.g., "John Doe")
   - Email: Any email format (e.g., "test@example.com")
   - Password: At least 6 characters
   - Confirm Password: Must match password
3. **Submit**: Click "Register" button
4. **Success**: You'll see a success message and be redirected to login

### 2. Login Flow

**Email & Password Login**:

1. **Visit Login Page**: Go to `/login`
2. **Enter Credentials**: Use the registered email and password
3. **Submit**: Click "Login" button
4. **Success**: Redirected to home page with header visible

**Social Login (Mock)**:

1. **Visit Login Page**: Go to `/login`
2. **Click Social Button**:
   - "Login with Facebook" - Creates mock Facebook account
   - "Login with Google" - Creates mock Google account
   - "Login with Apple" - Creates mock Apple account
3. **Success**: Immediately logged in and redirected to home page

### 3. Home Page Testing

1. **Verify Header**: Should show app name, navigation, theme toggle, language selector
2. **Browse Movies**:
   - See "Popular Movies" section
   - See "Now Playing" section
   - See "Upcoming" section
   - See "Top Rated" section
3. **Movie Cards**: Each shows poster, rating, and favorite heart icon
4. **Responsive**: Resize browser to test mobile responsiveness

### 4. Movie Details Testing

1. **Click Any Movie Card**: Should navigate to detailed movie page
2. **View Information**:
   - Movie poster and backdrop
   - Title, year, rating, runtime
   - Synopsis/overview
   - Budget, revenue, status information
   - Cast list with character names
   - Crew information
3. **Add to Favorites**: Click heart icon to add/remove from favorites
4. **Navigate Back**: Use back button to return to previous page

### 5. Search Testing

1. **Search Page**: Navigate via header or URL `/search`
2. **Search Movies**:
   - Type movie title (e.g., "Avatar", "Matrix", "Inception")
   - Results appear in grid
   - Empty state when no results
3. **Clear Search**: Type new query to search again

### 6. Favorites Testing

1. **Add Favorites**: From home page or movie details, click heart icon
2. **Navigate to Favorites**: Click "Favorites" in header or `/favorites`
3. **View Saved Movies**: All favorited movies displayed in grid
4. **Remove from Favorites**: Click heart to remove
5. **Empty State**: When no favorites, shows "No favorites" message

### 7. Theme Testing

1. **Toggle Theme**: Click sun/moon icon in header
2. **Light Mode**: White background, dark text
3. **Dark Mode**: Dark background, light text
4. **Persistence**: Refresh page, theme persists
5. **All Pages**: Theme applies to all pages

### 8. Language Testing

1. **English**: Click "EN" in header
2. **Indonesian**: Click "ID" in header
3. **All Text Updates**: All UI text changes language
4. **Persistence**: Refresh page, language persists
5. **Test Pages**:
   - Headers and button text change
   - Error messages translate
   - Validation messages translate

### 9. Form Validation Testing

1. **Login Page**:
   - Empty email: Shows "required" error
   - Invalid email format: Shows "invalid email" error
   - Empty password: Shows "required" error
   - Wrong password: Shows error message

2. **Register Page**:
   - Empty fields: Show "required" errors
   - Invalid email: Shows "invalid email" error
   - Short password: Shows "password too short" error
   - Mismatched passwords: Shows "passwords do not match" error

### 10. Responsive Design Testing

**Desktop (1024px+)**:

- Full header with logo text visible
- 4-column movie grid
- Detailed movie layouts optimized for large screens

**Tablet (768px - 1024px)**:

- Collapsible navigation
- 3-column movie grid
- Adjusted spacing

**Mobile (480px - 768px)**:

- Hamburger menu consideration
- 2-column movie grid
- Touch-friendly button sizes
- Stack layouts vertically

**Small Mobile (<480px)**:

- Single column or 2-column grid
- Large touch targets
- Simplified layouts

## 🔑 Test Accounts

### Pre-registered Test Account

**Email**: test@example.com  
**Password**: password123

(Create this during registration testing)

## 📊 Test Data

The application includes 10 mock movies:

1. The Shawshank Redemption
2. The Dark Knight
3. Inception
4. The Godfather
5. Pulp Fiction
6. Forrest Gump
7. The Matrix
8. Avatar
9. Interstellar
10. The Lion King

Try searching for any of these or their partial names.

## 🎯 Feature Verification Checklist

- [ ] User can register with email/password
- [ ] User can login with registered credentials
- [ ] User can login with social account (mock)
- [ ] User can see popular movies
- [ ] User can see now playing movies
- [ ] User can see upcoming movies
- [ ] User can see top-rated movies
- [ ] User can search for movies
- [ ] User can view detailed movie information
- [ ] User can see cast and crew information
- [ ] User can add movies to favorites
- [ ] User can view favorites page
- [ ] User can remove from favorites
- [ ] User can toggle light/dark theme
- [ ] User can change language (EN/ID)
- [ ] Application is responsive on mobile
- [ ] Application is responsive on tablet
- [ ] Application is responsive on desktop
- [ ] All form validation works
- [ ] Error messages display correctly
- [ ] Loading states work

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is in use, Vite will automatically try 5174, 5175, etc.

```bash
# Or specify a different port
npm run dev -- --port 3000
```

### Dependencies Not Installed

```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build
```

### CSS Not Loading

- Check that CSS files are imported in components
- Verify CSS file paths are correct
- Clear browser cache

### localStorage Issues

- Open DevTools → Application → Local Storage
- Verify data is being stored
- Clear if needed: `localStorage.clear()`

## 📁 Project Files

### Key Files to Review

1. **Authentication**:
   - `src/context/AuthContext.tsx` - Auth logic
   - `src/pages/LoginPage.tsx` - Login form
   - `src/pages/RegisterPage.tsx` - Registration form

2. **Movie Display**:
   - `src/services/movieService.ts` - Mock movie data
   - `src/components/MovieCard.tsx` - Movie display component
   - `src/pages/HomePage.tsx` - Main movie listing
   - `src/pages/MovieDetailsPage.tsx` - Detailed view

3. **Styling**:
   - `src/styles/globals.css` - Global styles and CSS variables
   - `src/styles/components/` - Component styles
   - `src/styles/pages/` - Page styles

4. **Localization**:
   - `src/locales/en.json` - English translations
   - `src/locales/id.json` - Indonesian translations
   - `src/locales/i18n.ts` - i18n setup

5. **Types**:
   - `src/types/index.ts` - All TypeScript types

## 🎓 Learning Resources

### Code Quality

- Check `src/components/` for component best practices
- Review `src/hooks/useInput.ts` for custom hook patterns
- Study `src/context/` for Context API usage

### Styling

- Review `src/styles/globals.css` for CSS variable system
- Check responsive design in component CSS files
- See theme implementation in `ThemeContext.tsx`

### TypeScript

- Review `src/types/index.ts` for type definitions
- Check type usage in all components
- See interface implementations in context files

## 🚀 Next Steps

### For Development

1. Familiarize yourself with the codebase structure
2. Try modifying styles in CSS files
3. Add new translations to JSON files
4. Experiment with the mock data in movieService
5. Add new pages following the existing pattern

### For Production

1. Replace mock movie service with real API
2. Implement Firebase for authentication
3. Add error tracking (Sentry)
4. Implement analytics
5. Add proper logging
6. Set up CI/CD pipeline

## 📞 Support

For issues or questions:

1. Check the `ARCHITECTURE.md` file for system design
2. Review relevant component source code
3. Check browser console for errors
4. Verify localStorage in DevTools

## ✨ Enjoy!

The Alpha Movie application is now ready to use. Register, login, explore movies, and enjoy the full feature set!
