# Deploying Local-AIDS to Firebase

You are set up to deploy the Frontend to Firebase Hosting and the Backend to Firebase Cloud Functions.

## ⚠️ Important Database Requirement
Your application uses **PostgreSQL**. Firebase **does not** provide a PostgreSQL database. You must host your database separately (e.g., on Render, Neon, Supabase, or AWS).

**You cannot use `localhost` for your database when deploying to the cloud.**

### Step 1: Get your Database URL
1. If you don't have one, create a free database on [Render](https://render.com) or [Neon.tech](https://neon.tech).
2. Get the connection string. It will look like:
   `postgres://username:password@hostname.com/database_name`

### Step 2: Configure Environment Variables
Cloud Functions need to know your production database URL and JWT secret.

Run this command in your terminal (replace values with your real ones):

```bash
firebase functions:config:set env.database_url="YOUR_DATABASE_CONNECTION_STRING" env.jwt_secret="your-secure-secret-key"
```

### Step 3: Deployment

1. **Install Function Dependencies:**
   ```bash
   cd functions
   npm install
   cd ..
   ```

2. **Build the Frontend:**
   ```bash
   npm run build
   ```

3. **Deploy to Firebase:**
   ```bash
   firebase deploy
   ```

### Step 4: Finalize
After deployment, Firebase will give you a **Hosting URL** (e.g., `https://local-aid-dcbca.web.app`).

Application should now be live!
