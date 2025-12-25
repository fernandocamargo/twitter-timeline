# Twitter Timeline

A React + Redux application that displays a Twitter-like timeline interface with mock Twitter API v1.1 endpoints.

## 🚀 Live Demo

**[View Live Demo on Vercel](https://twitter-timeline-khaki.vercel.app)**

## ✨ Features

- 📱 Twitter Timeline UI with tweets, media, and interactions
- 👥 User profiles and followers display
- 📊 Trending topics and suggestions
- 🎨 Responsive design
- 🔌 Mock Twitter API v1.1 RESTful endpoints
- ⚡ Serverless backend deployment

## 🛠️ Tech Stack

**Frontend:**
- React 15 + Redux
- Moment.js for date formatting
- SCSS for styling
- Webpack for bundling

**Backend:**
- Express.js (local development)
- Vercel Serverless Functions (production)
- Mock Twitter API v1.1 implementation

**Deployment:**
- Vercel (frontend + serverless functions)
- Docker support for local development

## 📋 Installation

### Prerequisites

- Node.js 14+ (for local development)
- Docker (optional, for containerized development)
- npm or yarn

### Using Docker (Recommended)

```bash
docker-compose up
```

The application will be available at:
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:1337

### Using Local Environment

```bash
# Install dependencies
npm install --legacy-peer-deps

# Note: Use --legacy-peer-deps due to older dependency versions

# Start development server (frontend + backend)
npm start
```

The application will be available at:
- **Frontend:** http://localhost:8080 (with hot reload)
- **Backend API:** http://localhost:1337

## 💻 Development

### Local Development Server

```bash
npm start
```

This starts both:
1. **Backend server** on port 1337 (Express with mock Twitter API)
2. **Frontend dev server** on port 8080 (Webpack with hot reload)

### Available Scripts

- `npm start` - Start development environment (frontend + backend)
- `npm run build` - Build production bundle
- `npm run backend` - Run backend server only
- `npm run reload` - Run frontend dev server only
- `npm run clean` - Clean dist directory
- `npm run lint` - Run ESLint

## 🏗️ Production Build

```bash
# Clean previous build
npm run clean

# Build for production
npm run build
```

Built files will be in the `dist/` directory.

## 🚀 Deployment

### Deploy to Vercel

The project is configured for one-click deployment to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fernandocamargo/twitter-timeline)

Or deploy via CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

📖 **[Detailed Deployment Guide](./VERCEL_DEPLOYMENT.md)** - Complete instructions for Vercel deployment

### Key Deployment Features

- ✅ Serverless API functions in `/api` directory
- ✅ Automatic builds on git push (when connected to GitHub)
- ✅ Global CDN distribution
- ✅ HTTPS by default
- ✅ Zero configuration needed

## 🔌 API Endpoints

The mock Twitter API v1.1 endpoints available:

### Users
- `GET /api/twitter/users/show.json?screen_name={username}` - Get user profile
- `GET /api/twitter/followers/list.json?screen_name={username}` - Get user followers
- `GET /api/twitter/users/suggestions.json` - Get suggestion categories
- `GET /api/twitter/users/suggestions/{slug}.json` - Get suggestions by category

### Timeline
- `GET /api/twitter/statuses/user_timeline.json?screen_name={username}` - Get user tweets

### Trends
- `GET /api/twitter/trends/place.json?id=1` - Get trending topics

### Example Usage

```bash
# Get Americanas.com profile
curl https://twitter-timeline-khaki.vercel.app/api/twitter/users/show.json?screen_name=americanascom

# Get timeline
curl https://twitter-timeline-khaki.vercel.app/api/twitter/statuses/user_timeline.json?screen_name=americanascom
```

## 📁 Project Structure

```
twitter-timeline/
├── api/                          # Vercel Serverless Functions
│   ├── _lib/
│   │   └── mock-data.js         # Shared mock data helpers
│   └── twitter/                 # Twitter API endpoints
│       ├── users/
│       ├── followers/
│       ├── statuses/
│       └── trends/
├── src/
│   ├── js/
│   │   ├── client/              # React frontend application
│   │   │   ├── actions/
│   │   │   ├── components/
│   │   │   ├── containers/
│   │   │   ├── reducers/
│   │   │   └── utils/
│   │   ├── server/              # Express backend (local dev)
│   │   │   ├── back-end.js
│   │   │   └── mock-twitter-api.js
│   │   └── data/                # API data layer
│   ├── scss/                    # Stylesheets
│   └── markup/                  # HTML templates
├── dist/                        # Production build output
├── vercel.json                  # Vercel configuration
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Apache-2.0

## 👨‍💻 Author

**Fernando Camargo Del Buono**
- GitHub: [@fernandocamargo](https://github.com/fernandocamargo)
- Email: camargodelbuono@gmail.com

## 📊 Technical Analysis

**[📖 Read Comprehensive Code Analysis](./CODE_ANALYSIS.md)**

Detailed technical documentation covering:
- Architecture & design patterns (Redux, Container/Presentational, Factory, Strategy)
- Historical context (2016 React/Redux era)
- Advanced responsive design techniques
- Semantic HTML & CSS Zen Garden philosophy
- Full-stack implementation details
- Code quality & best practices

Perfect for technical interviews and portfolio presentations.

## 🔗 Links

- **Live Demo:** https://twitter-timeline-khaki.vercel.app
- **Original Repository:** https://github.com/fernandocamargo/twitter-timeline
- **Code Analysis:** [CODE_ANALYSIS.md](./CODE_ANALYSIS.md)
- **Deployment Guide:** [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
