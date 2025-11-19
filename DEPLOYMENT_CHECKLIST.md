# Deployment Checklist - Sunflix Video Platform

## ✅ Pre-Deployment Checklist

### 1. MongoDB Connection
- [x] MongoDB connection string configured
- [x] MongoDB Atlas network access allows Vercel IPs (0.0.0.0/0)
- [x] Database collections exist (users, videos, comments, messages, etc.)
- [x] Test connection: `node scripts/check-db.js`

### 2. Code Updates
- [x] All API routes added to `api/index.js` for Vercel
- [x] MongoDB connection optimized for serverless
- [x] API client uses relative URLs in production
- [x] CORS configured for production
- [x] Vercel configuration (`vercel.json`) updated

### 3. Environment Variables
- [ ] `VITE_MONGODB_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Strong random secret for JWT signing
- [ ] `VITE_API_URL` - Optional (uses relative URLs if not set)

### 4. Features Verified
- [x] User Authentication (Signup/Login/Admin Login)
- [x] Video Management (CRUD operations)
- [x] User Management
- [x] Admin Panel
- [x] Settings Management
- [x] Messages/Contact Form
- [x] Ads Management
- [x] Comments System
- [x] Watch History
- [x] Notifications
- [x] Favorites
- [x] Search Functionality

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment with MongoDB"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `build`

### Step 3: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

1. **VITE_MONGODB_URI**
   ```
   mongodb+srv://rizqaratech_db_user:i3PYU789a4VXwWEu@sunflix.a9egezc.mongodb.net/?appName=sunflix
   ```

2. **JWT_SECRET**
   ```
   [Generate a strong random secret]
   ```

3. **VITE_API_URL** (Optional)
   ```
   [Leave empty for relative URLs]
   ```

### Step 4: Initialize Database (First Time)
After deployment, create admin user:

**Option A: Via API**
```bash
curl -X POST https://your-app.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@sunflix.com","password":"admin123"}'
```

Then update user role to 'admin' in MongoDB Atlas.

**Option B: Use init-db script locally**
```bash
vercel env pull .env.local
npm run init-db
```

## 🧪 Post-Deployment Testing

### API Endpoints Test
- [ ] `GET /api/videos` - Returns videos
- [ ] `GET /api/settings` - Returns settings
- [ ] `POST /api/auth/signup` - User registration
- [ ] `POST /api/auth/login` - User login
- [ ] `POST /api/auth/admin-login` - Admin login

### Frontend Features Test
- [ ] Homepage loads videos
- [ ] User can register
- [ ] User can login
- [ ] Admin can login
- [ ] Admin can add videos
- [ ] Admin can manage users
- [ ] Admin can manage settings
- [ ] Contact form works
- [ ] Video player works
- [ ] Comments work
- [ ] Search works

## 📝 Important Notes

1. **MongoDB Connection**: Uses connection pooling for serverless
2. **API Routes**: All routes are in `/api/index.js` for Vercel
3. **CORS**: Configured to allow all origins
4. **Environment**: Production uses relative API URLs
5. **Build**: Output directory is `build/`

## 🔧 Troubleshooting

### If API returns 404
- Check `vercel.json` rewrites configuration
- Verify `api/index.js` exports Express app
- Check Vercel function logs

### If MongoDB connection fails
- Verify `VITE_MONGODB_URI` environment variable
- Check MongoDB Atlas network access
- Verify connection string format

### If CORS errors occur
- Check CORS configuration in `api/index.js`
- Verify API URL in frontend
- Check browser console for errors

## 📚 Documentation

- **Deployment Guide**: See `VERCEL_DEPLOYMENT.md`
- **MongoDB Setup**: See `MONGODB_MIGRATION_GUIDE.md`
- **Quick Start**: See `QUICKSTART_AFTER_MIGRATION.md`

---

**Ready to deploy! Follow the steps above and your Sunflix platform will be live! 🎉**

