# Vercel Deployment Guide

This project is configured for deployment on Vercel while maintaining local development capabilities.

## 🚀 Quick Deploy

### Option 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (first time will prompt for configuration)
vercel

# Deploy to production
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the configuration
6. Click "Deploy"

## 📁 Project Structure

```
twitter-timeline/
├── api/                          # Vercel Serverless Functions (for production)
│   ├── _lib/
│   │   └── mock-data.js         # Shared mock data helpers
│   └── twitter/
│       ├── users/
│       │   ├── show.json.js     # /api/twitter/users/show.json
│       │   └── suggestions.json.js
│       ├── followers/
│       │   └── list.json.js
│       ├── statuses/
│       │   └── user_timeline.json.js
│       └── trends/
│           └── place.json.js
├── src/js/server/               # Express Backend (for local development)
│   ├── back-end.js             # Local server
│   └── mock-twitter-api.js     # Original Express routes
├── dist/                        # Build output (static files)
└── vercel.json                  # Vercel configuration
```

## 🔧 How It Works

### Local Development
- Runs Express server on `http://localhost:1337`
- Uses `/twitter/*` routes with the Express backend
- Hot reload enabled via webpack-dev-server
- Run with: `npm start`

### Production (Vercel)
- Static files served from `/dist`
- API routes served as serverless functions from `/api`
- Calls `/api/twitter/*` endpoints
- Auto-scales and globally distributed

## 🛠️ Configuration Files

### `vercel.json`
Configures Vercel build and routing:
- Builds static files to `/dist`
- Routes API calls to `/api/*`
- Serves SPA with fallback to `index.html`

### `src/js/data/api.js`
Environment-aware API endpoint configuration:
```javascript
{
  development: 'http://localhost:1337',  // Local Express server
  production: '/api'                      // Vercel serverless functions
}
```

## ✅ Verification

After deployment, your app will be available at:
```
https://twitter-timeline-khaki.vercel.app
```

API endpoints will be accessible at:
```
https://twitter-timeline-khaki.vercel.app/api/twitter/users/show.json?screen_name=americanascom
https://twitter-timeline-khaki.vercel.app/api/twitter/statuses/user_timeline.json?screen_name=americanascom
https://twitter-timeline-khaki.vercel.app/api/twitter/followers/list.json?screen_name=americanascom
https://twitter-timeline-khaki.vercel.app/api/twitter/users/suggestions.json
https://twitter-timeline-khaki.vercel.app/api/twitter/trends/place.json
```

## 🎯 Benefits for Portfolio

✨ **Professional Setup:**
- Modern serverless architecture
- Automatic scaling and global CDN
- Zero-downtime deployments
- HTTPS by default

💼 **Demonstrates Skills:**
- Full-stack development
- API design and implementation
- Cloud deployment experience
- Modern DevOps practices

🚀 **Easy to Share:**
- Live URL for recruiters/hiring managers
- No server maintenance required
- Always online and performant

## 📝 Notes

- Both local and production use the same mock data
- No environment variables needed (all data is mocked)
- The Express backend remains for local development convenience
- Vercel functions auto-deploy on git push (if connected to GitHub)

## 🐛 Troubleshooting

**Build fails:**
```bash
# Clear dist and rebuild
npm run clean
npm run build
```

**API routes not working:**
- Check that file names match: `[route].json.js`
- Verify CORS headers are set in each API route
- Check browser console for correct endpoint calls

**Local dev works but Vercel doesn't:**
- Verify `NODE_ENV=production` is set during build
- Check that api.js exports the correct production endpoint
- Review Vercel build logs in the dashboard
