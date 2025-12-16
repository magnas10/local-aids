# Local-AIDS Backend API

A Node.js/Express backend API for the Local-AIDS application with PostgreSQL database.

## Features

- 🔐 **Authentication** - JWT-based auth with register, login, logout
- 👥 **User Management** - Profile management, role-based access control
- 📅 **Events** - Create, manage, and register for community events
- 💰 **Donations** - Process and track donations
- 💬 **Messages** - Internal messaging system
- 📧 **Contact** - Handle contact form submissions
- 🖼️ **Gallery** - Image gallery with file upload
- 🤝 **Partners** - Manage partner organizations

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (local or cloud)
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Copy the example environment file and update with your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
DB_NAME=local_aids
DB_USER=your-username
DB_PASSWORD=your-password
DB_HOST=localhost
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

### 3. Start PostgreSQL

Make sure PostgreSQL is running locally, or use a cloud PostgreSQL service:

```bash
# If using local PostgreSQL
# On macOS with Homebrew:
brew services start postgresql

# Or start manually:
pg_ctl -D /usr/local/var/postgres start
```

Create the database:

```sql
CREATE DATABASE local_aids;
```

### 4. Seed Sample Data (Optional)

```bash
npm run seed
```

This creates sample users:
- **Admin**: admin@localaid.org / admin123
- **Volunteer**: volunteer@example.com / password123
- **User**: jane@example.com / password123

### 5. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run at `http://localhost:5000`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/password` | Update password |
| POST | `/api/auth/logout` | Logout user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (admin) |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/profile` | Update profile |
| PUT | `/api/users/:id/role` | Update user role (admin) |
| DELETE | `/api/users/:id` | Deactivate user (admin) |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/upcoming` | Get upcoming events |
| GET | `/api/events/:id` | Get event by ID |
| POST | `/api/events` | Create event (admin) |
| PUT | `/api/events/:id` | Update event (admin) |
| DELETE | `/api/events/:id` | Delete event (admin) |
| POST | `/api/events/:id/register` | Register for event |
| DELETE | `/api/events/:id/register` | Cancel registration |

### Donations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donations` | Get all donations (admin) |
| GET | `/api/donations/my` | Get user's donations |
| GET | `/api/donations/stats` | Get donation statistics |
| POST | `/api/donations` | Create donation |
| GET | `/api/donations/:id` | Get donation by ID |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages` | Get user's messages |
| GET | `/api/messages/unread-count` | Get unread count |
| GET | `/api/messages/:id` | Get message by ID |
| POST | `/api/messages` | Send message |
| PUT | `/api/messages/:id/read` | Mark as read |
| DELETE | `/api/messages/:id` | Delete message |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contact` | Get all submissions (admin) |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact/:id` | Get submission (admin) |
| PUT | `/api/contact/:id` | Update submission (admin) |
| DELETE | `/api/contact/:id` | Delete submission (admin) |

### Gallery
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gallery` | Get all gallery items |
| GET | `/api/gallery/categories` | Get categories |
| GET | `/api/gallery/:id` | Get item by ID |
| POST | `/api/gallery` | Upload image (admin) |
| PUT | `/api/gallery/:id` | Update item (admin) |
| DELETE | `/api/gallery/:id` | Delete item (admin) |

### Partners
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/partners` | Get all partners |
| GET | `/api/partners/:id` | Get partner by ID |
| POST | `/api/partners` | Add partner (admin) |
| PUT | `/api/partners/:id` | Update partner (admin) |
| DELETE | `/api/partners/:id` | Delete partner (admin) |

## Project Structure

```
server/
├── config/
│   └── database.js    # PostgreSQL connection
├── middleware/
│   └── auth.js         # JWT authentication middleware
├── models/
│   ├── User.js         # User model
│   ├── Event.js        # Event model
│   ├── Donation.js     # Donation model
│   ├── Message.js      # Message model
│   ├── Contact.js      # Contact model
│   ├── GalleryItem.js  # Gallery model
│   └── Partner.js      # Partner model
├── routes/
│   ├── auth.js         # Auth routes
│   ├── users.js        # User routes
│   ├── events.js       # Event routes
│   ├── donations.js    # Donation routes
│   ├── messages.js     # Message routes
│   ├── contact.js      # Contact routes
│   ├── gallery.js      # Gallery routes
│   └── partners.js     # Partner routes
├── seeds/
│   └── seedData.js     # Database seeder
├── uploads/
│   └── gallery/        # Uploaded images
├── .env                # Environment variables
├── .env.example        # Example env file
├── package.json        # Dependencies
└── server.js           # Entry point
```

## Testing the API

Use tools like [Postman](https://www.postman.com/) or [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) to test the API.

### Example: Login Request

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@localaid.org", "password": "admin123"}'
```

### Example: Protected Request

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "errors": [
    { "msg": "Validation error message", "path": "field" }
  ]
}
```

## Security Notes

- Change `JWT_SECRET` in production
- Use HTTPS in production
- Consider rate limiting for public endpoints
- Sanitize all user inputs
- Store sensitive data encrypted

## License

MIT
