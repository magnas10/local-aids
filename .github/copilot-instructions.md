# Local-AIDS Codebase Instructions

## Architecture Overview

This is a **full-stack PERN application** with a React frontend and Express/PostgreSQL backend serving a community AIDS support platform. The codebase follows a clear separation:

- **Frontend**: React SPA with React Router, context-based auth, and component-driven UI
- **Backend**: Express.js REST API with JWT authentication, role-based access control, and PostgreSQL models
- **Development**: Concurrent development setup with proxy configuration

## Key Development Workflows

### Start Development Environment
```bash
npm run dev          # Starts both frontend (3000) and backend (5000) concurrently
npm run server       # Backend only
npm start            # Frontend only
```

### Database Operations
```bash
npm run seed         # Seed database with sample data (server/seeds/seedData.js)
```

## Authentication & Authorization Patterns

### Frontend Auth Flow
- Uses `AuthContext` with React Context API for global auth state
- JWT tokens stored in localStorage with automatic validation
- Three auth components: `ProtectedRoute`, `AdminRoute`, and manual `useAuth()` checks
- Auth state persists across page reloads via `useEffect` token verification

### Backend Auth Middleware
- `protect`: Requires valid JWT token (Bearer format)
- `admin`: Requires admin role after authentication
- `optionalAuth`: Sets user if token present, continues if not
- Always use `protect` before role-specific middleware

## API Architecture Patterns

### Request/Response Flow
```javascript
// Frontend pattern (src/services/api.js)
const authFetch = async (url, options = {}) => {
  // Auto-adds Authorization header, handles 401s
}

// Backend pattern (server/routes/*.js)
router.post('/', protect, admin, validators, async (req, res) => {
  // Route handlers with middleware chain
});
```

### Error Handling Convention
- Frontend: Throw errors with user-friendly messages from API responses
- Backend: Return structured JSON with `message` field and appropriate HTTP status
- Validation errors use `express-validator` with consistent format

## Database Model Patterns

### Schema Structure (server/models/*.js)
- All models use Sequelize with built-in validation
- User roles: `user`, `volunteer`, `admin`
- Common fields: `createdAt`, `updatedAt` (auto-added by timestamps)
- Models: User, Event, Donation, Message, Contact, GalleryItem, Partner

### File Upload Pattern
- Uses `multer` middleware for file handling
- Uploaded files served via `/uploads` static route
- Gallery images stored in `server/uploads/gallery/`

## Component Architecture

### Page Components (src/pages/)
- Each page is a composition of reusable components
- Home page pattern: `<HeroSection /><Opportunities /><CommunityStories />...`
- Pages handle data fetching via `api.js` service functions

### Routing Structure
- All routes defined in `App.js` with React Router v6
- Protected routes wrap components requiring authentication
- Admin routes additionally check admin role

## Development Conventions

### File Organization
- Frontend components in `src/components/` with co-located CSS files
- Backend routes follow RESTful patterns in `server/routes/`
- Shared utilities in `src/services/` (frontend) and `server/middleware/` (backend)

### State Management
- Global auth state via Context API (`src/context/AuthContext.js`)
- Local component state for UI-specific data
- No Redux - relies on Context + local state pattern

### API Integration
- Proxy setup in `package.json` routes frontend API calls to backend
- All API calls go through centralized service functions in `src/services/api.js`
- Backend API prefix: `/api/` for all endpoints

## Key Dependencies & Tools

- **Frontend**: React 19, React Router v7, no UI framework (custom CSS)
- **Backend**: Express, Sequelize, JWT, bcryptjs, multer, express-validator
- **Development**: concurrently for dual server setup, nodemon for backend hot-reload

## Common Pitfalls

- JWT tokens require 'Bearer ' prefix in Authorization headers
- User roles are strings, not enums in frontend - use exact matches
- File uploads require multipart/form-data, handled by multer middleware
- PostgreSQL connection uses environment variables `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`
- Frontend API calls use proxy in development, update for production deployment