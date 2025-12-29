# Local AIDS Community Support Platform

A full-stack PERN (PostgreSQL, Express.js, React.js, Node.js) application designed to support local AIDS communities through event management, volunteer coordination, donations, and community engagement.

## Features

- 🔐 **User Authentication** - JWT-based authentication with role-based access control
- 👥 **User Roles** - Admin, Volunteer, and regular User roles
- 📅 **Event Management** - Create, manage, and register for community events
- 💰 **Donation System** - Process and track donations
- 💬 **Messaging** - Internal messaging system between users
- 📧 **Contact Forms** - Handle community inquiries
- 🖼️ **Gallery** - Image gallery with file upload capabilities
- 🤝 **Partner Management** - Manage partner organizations
- 📋 **Help Requests** - Volunteer request system

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks and context
- **React Router v7** - Client-side routing
- **CSS Modules** - Component-scoped styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - REST API framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database operations
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **multer** - File upload handling

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (local or cloud instance)
- npm or yarn

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd local-aids
npm install
cd server && npm install && cd ..
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE local_aids;
```

### 3. Environment Configuration

Copy the example environment file in the server directory:

```bash
cd server
cp .env.example .env
```

Update `.env` with your database credentials:

```env
DB_NAME=local_aids
DB_USER=your-username
DB_PASSWORD=your-password
DB_HOST=localhost
JWT_SECRET=your-super-secret-key
CLIENT_URL=http://localhost:3000
```

### 4. Seed Sample Data

```bash
npm run seed
```

This creates sample users:
- **Admin**: admin@localaid.org / admin123
- **Volunteer**: volunteer@example.com / password123
- **User**: jane@example.com / password123

### 5. Start Development Environment

```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually:
npm start          # Frontend only (port 3000)
npm run server     # Backend only (port 5001)
```

## Project Structure

```
local-aids/
├── public/                 # Static assets
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── context/            # React context providers
│   ├── services/           # API service functions
│   └── ...
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Express middleware
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── seeds/              # Database seed scripts
│   └── uploads/            # File uploads
└── ...
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (admin/volunteer)
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### And more... (see server README for complete API documentation)

## Development

### Available Scripts

```bash
npm run dev          # Start both frontend and backend
npm start            # Start frontend only
npm run server       # Start backend only
npm run build        # Build for production
npm test             # Run tests
npm run seed         # Seed database
```

### Database Operations

The application uses Sequelize ORM with PostgreSQL. Models auto-sync on server start.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
