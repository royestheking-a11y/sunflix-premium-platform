# Vercel Deployment Guide - Sunflix Video Platform

## 🚀 Complete Deployment Instructions

This guide will help you deploy the Sunflix Video Platform to Vercel with MongoDB Atlas.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas Account**: Your MongoDB connection string
3. **GitHub Account**: For connecting your repository

## Step 1: Prepare Your Repository

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Step 3: Configure Environment Variables

In your Vercel project settings, add these environment variables:

### Required Environment Variables

1. **VITE_MONGODB_URI**
   - Value: `mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix`
   - Description: MongoDB Atlas connection string

2. **JWT_SECRET**
   - Value: Generate a strong random secret (e.g., use `openssl rand -base64 32`)
   - Description: Secret key for JWT token signing
   - Example: `your-super-secret-jwt-key-change-this-in-production`

3. **VITE_API_URL** (Optional)
   - Value: Leave empty or set to your Vercel domain
   - Description: API base URL (uses relative URLs in production if not set)

### How to Add Environment Variables

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: `VITE_MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environment**: Production, Preview, Development (select all)
4. Repeat for `JWT_SECRET` and `VITE_API_URL` (if needed)

## Step 4: MongoDB Atlas Configuration

### Allow Vercel IP Addresses

1. Go to MongoDB Atlas Dashboard
2. Navigate to **Network Access**
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (0.0.0.0/0) OR add Vercel's IP ranges
5. Save changes

### Verify Database Connection

Your MongoDB connection string should be:
```
mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix
```

## Step 5: Deploy

1. After configuring environment variables, Vercel will automatically redeploy
2. Or trigger a new deployment manually:
   - Go to **Deployments** tab
   - Click **Redeploy** on the latest deployment

## Step 6: Verify Deployment

### Check API Endpoints

1. Visit: `https://your-project.vercel.app/api/videos`
   - Should return JSON array of videos

2. Visit: `https://your-project.vercel.app/api/settings`
   - Should return settings object

### Test Features

1. **Frontend**: Visit your Vercel URL
2. **User Registration**: Test signup
3. **Admin Login**: Test admin panel
4. **Video Management**: Test adding/editing videos
5. **Messages**: Test contact form
6. **Settings**: Test admin settings

## Step 7: Initialize Database (First Time)

If this is a fresh deployment, initialize the database:

### Option A: Use Vercel CLI

```bash
vercel env pull .env.local
npm run init-db
```

### Option B: Use MongoDB Atlas Shell

Connect to your database and run the initialization script manually.

### Option C: Create Admin User via API

```bash
curl -X POST https://your-project.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@sunflix.com",
    "password": "admin123"
  }'
```

Then update the user role to 'admin' in MongoDB Atlas.

## Troubleshooting

### API Routes Not Working

1. Check `vercel.json` configuration
2. Verify API routes are in `/api/index.js`
3. Check Vercel function logs in dashboard

### MongoDB Connection Errors

1. Verify `VITE_MONGODB_URI` is set correctly
2. Check MongoDB Atlas Network Access settings
3. Verify connection string format

### CORS Errors

- CORS is configured to allow all origins in `api/index.js`
- If issues persist, check browser console for specific errors

### Build Errors

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version (should be 18+)

## Project Structure for Vercel

```
/
├── api/
│   └── index.js          # Vercel serverless API handler
├── src/
│   ├── api/
│   │   ├── models/       # Mongoose models
│   │   └── server.js     # Local dev server
│   └── lib/
│       └── api-client.ts # API client (uses relative URLs in prod)
├── build/                # Build output (generated)
├── vercel.json           # Vercel configuration
└── package.json
```

## Environment Variables Summary

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_MONGODB_URI` | ✅ Yes | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | ✅ Yes | JWT signing secret | `your-secret-key` |
| `VITE_API_URL` | ❌ No | API base URL (optional) | `https://your-app.vercel.app` |

## Features Verified Working

✅ User Authentication (Signup/Login)
✅ Admin Panel
✅ Video Management (Add/Edit/Delete)
✅ User Management
✅ Messages/Contact Form
✅ Settings Management
✅ Ads Management
✅ Comments System
✅ Watch History
✅ Notifications
✅ Favorites
✅ Search Functionality

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check MongoDB Atlas connection status
3. Verify environment variables are set
4. Test API endpoints directly
5. Check browser console for frontend errors

## Next Steps After Deployment

1. Set up custom domain (optional)
2. Configure MongoDB indexes for performance
3. Set up monitoring and analytics
4. Configure backup strategy
5. Set up CI/CD for automatic deployments

---

**Your Sunflix Video Platform is now ready for production! 🎉**

