# 🚀 Vercel Deployment Guide - Afghanistan Travel Booking Platform

## 📋 Prerequisites
- GitHub account with your repository: https://github.com/sidra-ch/nestedkode-app
- MongoDB Atlas database (already configured)
- Vercel account (free tier is sufficient)

---

## 🌐 Method 1: Deploy via Vercel Web Dashboard (Recommended)

### Step 1: Login to Vercel
1. Go to: https://vercel.com
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. In the repository list, find: `sidra-ch/nestedkode-app`
3. Click **"Import"** next to your repository

### Step 3: Configure Project Settings
**Framework Preset:** Next.js (should be auto-detected)

**Root Directory:** `./` (leave as default)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

**Install Command:** `npm install` (default)

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add these:

| Variable Name | Value |
|--------------|-------|
| `MONGODB_URI` | `mongodb+srv://mssidrachaudhary_db_user:Nestedkode321@cluster0.2jv1j3y.mongodb.net/afghanibaba?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your_super_secret_jwt_key_change_in_production_12345` |
| `NODE_ENV` | `production` |

**Note:** Leave `NEXT_PUBLIC_APP_URL` blank for now - Vercel will provide the URL after deployment.

### Step 5: Deploy
1. Click **"Deploy"** button
2. Wait for build to complete (2-5 minutes)
3. Once deployed, you'll get a URL like: `https://nestedkode-app.vercel.app`

### Step 6: Update Environment Variable
1. Go to your project settings
2. Add/Update `NEXT_PUBLIC_APP_URL` with your Vercel URL
3. Redeploy (automatic on next push or manual redeploy)

---

## 💻 Method 2: Deploy via Vercel CLI

### Step 1: Login
```bash
vercel login
```
Choose your preferred login method (Email, GitHub, GitLab, or Bitbucket)

### Step 2: Deploy
```bash
# For production deployment
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? nestedkode-app
# - Directory? ./ (press Enter)
```

### Step 3: Add Environment Variables via CLI
```bash
# Add MongoDB URI
vercel env add MONGODB_URI production

# Add JWT Secret
vercel env add JWT_SECRET production

# Add Node Environment
vercel env add NODE_ENV production
```

### Step 4: Redeploy with Environment Variables
```bash
vercel --prod
```

---

## ⚙️ Post-Deployment Configuration

### 1. Seed Demo Users (Optional)
After deployment, you can seed demo users directly to MongoDB Atlas:
```bash
npx ts-node scripts/seedDemoUsers.ts
```

Or do it manually via MongoDB Atlas:
- Connect to your cluster
- Insert demo users in the `users` collection

### 2. Test the Deployment
Visit your Vercel URL and test:
- ✅ Home page loads
- ✅ Login with: `admin@humsafar.com` / `Admin123456`
- ✅ Navigate to different pages
- ✅ Check database connectivity

### 3. Configure Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## 🔧 Troubleshooting

### Build Fails
**Error:** "Module not found"
- **Solution:** Make sure `package.json` includes all dependencies
- Run `npm install` locally and commit `package-lock.json`

**Error:** "MongoDB connection failed"
- **Solution:** Check `MONGODB_URI` environment variable
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Runtime Errors
**Error:** "API route not found"
- **Solution:** Check that all API files are committed to Git
- Verify file structure in GitHub repository

**Error:** "JWT token invalid"
- **Solution:** Ensure `JWT_SECRET` is set in environment variables
- Should be the same secret used for seeding users

### Image Upload Issues
**Note:** Vercel serverless functions have read-only filesystem
- **Current:** Images stored in `/public/uploads/` (won't persist)
- **Solution:** Migrate to Cloudinary or AWS S3 for production
- See [DYNAMIC_IMAGES_GUIDE.md](DYNAMIC_IMAGES_GUIDE.md#cloud-storage-migration)

---

## 📊 Deployment Checklist

Before going live:
- [ ] All environment variables configured
- [ ] MongoDB Atlas IP whitelist allows Vercel (0.0.0.0/0)
- [ ] Demo users seeded in production database
- [ ] Test all major features (login, booking, search)
- [ ] Check mobile responsiveness
- [ ] Test API endpoints
- [ ] Configure error monitoring (optional: Sentry)
- [ ] Set up analytics (optional: Google Analytics, Vercel Analytics)

---

## 🔐 Security Recommendations

### Production Security
1. **Change JWT_SECRET** to a strong random value:
   ```bash
   # Generate a secure secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Update MongoDB credentials** if needed

3. **Enable Vercel Password Protection** (Settings → Deployment Protection)

4. **Add rate limiting** for API routes

5. **Review .env.local** - ensure sensitive data not committed

---

## 📈 Monitoring & Analytics

### Vercel Analytics
1. Go to project → Analytics
2. Enable Web Analytics (free)
3. View real-time traffic, performance metrics

### MongoDB Atlas Monitoring
1. Open MongoDB Atlas dashboard
2. Navigate to Metrics
3. Monitor:
   - Connection count
   - Query performance
   - Storage usage

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

1. Make changes locally
2. Commit: `git commit -m "your message"`
3. Push: `git push origin main`
4. Vercel automatically builds and deploys

**Preview Deployments:**
- Every push to non-main branches creates a preview deployment
- Share preview links for testing before merging to production

---

## 📞 Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **Project Repository:** https://github.com/sidra-ch/nestedkode-app

---

## 🎯 Quick Deploy Checklist

**For Web Dashboard:**
1. ✅ Login to vercel.com with GitHub
2. ✅ Import repository
3. ✅ Add environment variables
4. ✅ Click Deploy
5. ✅ Wait 2-5 minutes
6. ✅ Test deployment
7. ✅ Update NEXT_PUBLIC_APP_URL

**For CLI:**
1. ✅ Run `vercel login`
2. ✅ Run `vercel --prod`
3. ✅ Add environment variables
4. ✅ Redeploy with `vercel --prod`

---

**Deployment Date:** February 15, 2026  
**Version:** 1.0  
**Status:** Ready for Production 🚀
