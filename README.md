# Twitter Timeline

A [React](https://react.dev/) + [Redux](https://redux.js.org/) application that displays a Twitter-like timeline interface with mock [Twitter API v1.1](https://developer.twitter.com/en/docs/twitter-api/v1) endpoints (2016 era).

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
- [React 15](https://legacy.reactjs.org/versions) + [Redux](https://redux.js.org/)
- [Moment.js](https://momentjs.com/) for date formatting
- [SCSS](https://sass-lang.com/) for styling
- [Webpack](https://webpack.js.org/) for bundling

**Backend:**
- [Express.js](https://expressjs.com/) (local development)
- [Vercel Serverless Functions](https://vercel.com/docs/functions) (production)
- Mock [Twitter API v1.1](https://developer.twitter.com/en/docs/twitter-api/v1) implementation

**Deployment:**
- [Vercel](https://vercel.com/) (frontend + serverless functions)
- [Docker](https://www.docker.com/) support for local development

## 📋 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 14+ (for local development)
- [Docker](https://www.docker.com/) (optional, for containerized development)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

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
1. **Backend server** on port 1337 ([Express](https://expressjs.com/) with mock Twitter API)
2. **Frontend dev server** on port 8080 ([Webpack](https://webpack.js.org/) with [hot reload](https://webpack.js.org/concepts/hot-module-replacement/))

### Available Scripts

- `npm start` - Start development environment (frontend + backend)
- `npm run build` - Build production bundle
- `npm run backend` - Run backend server only
- `npm run reload` - Run frontend dev server only
- `npm run clean` - Clean dist directory
- `npm run lint` - Run [ESLint](https://eslint.org/)

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

The project is configured for one-click deployment to [Vercel](https://vercel.com/):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fernandocamargo/twitter-timeline)

Or deploy via [Vercel CLI](https://vercel.com/docs/cli):

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

- ✅ [Serverless Functions](https://vercel.com/docs/functions) in `/api` directory
- ✅ Automatic builds on git push (when connected to [GitHub](https://github.com/))
- ✅ Global [CDN](https://vercel.com/docs/edge-network/overview) distribution
- ✅ [HTTPS](https://vercel.com/docs/security/encryption) by default
- ✅ Zero configuration needed

## 🔌 API Endpoints

The mock [Twitter API v1.1](https://developer.twitter.com/en/docs/twitter-api/v1) [RESTful](https://restfulapi.net/) endpoints available:

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

## 📊 Technical Evaluation

### Code Quality Assessment

This project demonstrates **production-grade frontend engineering** from the 2016 [React](https://react.dev/) ecosystem, showcasing:

**🏗️ Architecture Excellence**
- **[Redux](https://redux.js.org/) [Flux Pattern](https://facebookarchive.github.io/flux/)**: Predictable state management with [unidirectional data flow](https://redux.js.org/understanding/thinking-in-redux/three-principles)
- **[Container/Presentational Separation](https://www.patterns.dev/react/presentational-container-pattern)**: Clear separation of business logic and UI concerns
- **[Immutable Data Structures](https://immutable-js.com/)**: Using [Immutable.js](https://immutable-js.com/) for state safety and performance
- **[Middleware Architecture](https://redux.js.org/understanding/history-and-design/middleware)**: Async operations handled via [Redux Thunk](https://github.com/reduxjs/redux-thunk)

**🎨 CSS/Design Mastery**
- **[CSS Zen Garden](http://www.csszengarden.com/) Philosophy**: Complete separation of structure and presentation through [semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)
- **[Mobile-First](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) [Responsive Design](https://web.dev/articles/responsive-web-design-basics)**: Advanced techniques using [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc), [viewport units](https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts), and [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
- **[SCSS](https://sass-lang.com/) Modular Architecture**: Component-based stylesheets with clear separation of concerns
- **Accessibility-First**: [Semantic HTML5](https://developer.mozilla.org/en-US/docs/Glossary/Semantics), [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)-friendly markup, [keyboard navigation](https://webaim.org/techniques/keyboard/) support

**⚡ Advanced Techniques**
- **Complex Entity Parsing**: Sophisticated algorithm for rendering [Twitter entities](https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/overview/entities-object) (mentions, hashtags, URLs, media)
- **[Factory Pattern](https://refactoring.guru/design-patterns/factory-method)**: Consistent mock data generation with deterministic behavior
- **[RESTful API](https://restfulapi.net/) Design**: [Twitter v1.1 API](https://developer.twitter.com/en/docs/twitter-api/v1) implementation with proper resource modeling
- **[Serverless](https://vercel.com/docs/functions) Deployment**: Modern cloud architecture with [Vercel Functions](https://vercel.com/docs/functions)

**💎 Code Quality**
- **[Functional Programming](https://eloquentjavascript.net/1st_edition/chapter6.html)**: [Pure functions](https://en.wikipedia.org/wiki/Pure_function), [composition](https://www.patterns.dev/vanilla/import-on-interaction), [immutability](https://immutable-js.com/)
- **Type Safety**: [PropTypes](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html) for runtime type checking (pre-[TypeScript](https://www.typescriptlang.org/) era)
- **Performance Optimization**: [Code splitting](https://webpack.js.org/guides/code-splitting/), production builds, [GPU acceleration](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) hints
- **Developer Experience**: [Hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/), concurrent dev servers, [ESLint](https://eslint.org/) integration

**📈 Modern Relevance**
While built with 2016 technology, the **fundamental patterns remain timeless**:
- [Component-based architecture](https://react.dev/learn/thinking-in-react)
- [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
- [Responsive design](https://web.dev/articles/responsive-web-design-basics) principles
- [RESTful API](https://restfulapi.net/) patterns
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) structure

**🕰️ Historical Context**
This project implements the **[Twitter API v1.1](https://developer.twitter.com/en/docs/twitter-api/v1)** specification from **2016**, representing the state-of-the-art social media API design from that era. The API v1.1 was released by Twitter in 2012 and remained the primary API until Twitter API v2 was introduced in 2020.

**[📖 Read Full Technical Analysis](./CODE_ANALYSIS.md)** for deep-dive into architecture, patterns, and implementation details.

## 🔗 Links

- **Live Demo:** https://twitter-timeline-khaki.vercel.app
- **Original Repository:** https://github.com/fernandocamargo/twitter-timeline
- **Code Analysis:** [CODE_ANALYSIS.md](./CODE_ANALYSIS.md)
- **Deployment Guide:** [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
