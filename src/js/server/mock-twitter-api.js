// Mock Twitter API v1.1 responses
// Based on the old Twitter API structure

const express = require('express');
const router = express.Router();

// Realistic user profiles database
const userProfiles = {
  'americanascom': {
    name: 'Americanas.com',
    location: 'São Paulo, Brasil',
    description: 'Seja bem-vindo ao perfil oficial da Americanas.com! Aqui você encontra ofertas incríveis e novidades. 🛍️',
    url: 'https://www.americanas.com.br',
    verified: true,
    followers_count: 2847392,
    friends_count: 892,
    statuses_count: 18453,
    created_at: 'Wed Mar 15 14:23:11 +0000 2010',
    profile_image: 'https://i.pravatar.cc/400?img=68',
    profile_banner: 'https://picsum.photos/1500/500?random=1'
  },
  'default': {
    name: 'Tech Enthusiast',
    location: 'San Francisco, CA',
    description: 'Software developer passionate about building amazing things. Coffee lover ☕ | Open source contributor 🚀',
    url: 'https://techblog.example.com',
    verified: false,
    followers_count: 5234,
    friends_count: 1432,
    statuses_count: 3821,
    created_at: 'Mon Jan 12 08:15:42 +0000 2014',
    profile_image: 'https://i.pravatar.cc/400?img=12',
    profile_banner: 'https://picsum.photos/1500/500?random=2'
  }
};

const randomFollowers = [
  { name: 'Maria Silva', screen_name: 'maria_silva', bio: 'Designer | UX/UI | 🎨 Creating beautiful digital experiences', location: 'Rio de Janeiro, Brasil', img: 1 },
  { name: 'João Santos', screen_name: 'joao_dev', bio: 'Full Stack Developer | React & Node.js enthusiast', location: 'São Paulo, Brasil', img: 5 },
  { name: 'Ana Costa', screen_name: 'ana_costa', bio: 'Product Manager @TechCorp | Building the future of tech', location: 'Belo Horizonte, Brasil', img: 10 },
  { name: 'Pedro Oliveira', screen_name: 'pedro_tech', bio: 'Software Engineer | AI & Machine Learning', location: 'Porto Alegre, Brasil', img: 15 },
  { name: 'Carla Ferreira', screen_name: 'carla_f', bio: 'Digital Marketing Specialist | Content Creator 📱', location: 'Brasília, Brasil', img: 20 },
  { name: 'Lucas Almeida', screen_name: 'lucas_code', bio: 'Backend Developer | Python & Go | Open Source contributor', location: 'Curitiba, Brasil', img: 25 },
  { name: 'Juliana Souza', screen_name: 'ju_souza', bio: 'Data Scientist | Machine Learning Engineer 🤖', location: 'Recife, Brasil', img: 30 },
  { name: 'Rafael Lima', screen_name: 'rafael_dev', bio: 'Mobile Developer | React Native & Flutter', location: 'Fortaleza, Brasil', img: 35 },
  { name: 'Beatriz Rocha', screen_name: 'bia_rocha', bio: 'Tech Writer | Developer Advocate | Conference Speaker', location: 'Salvador, Brasil', img: 40 },
  { name: 'Fernando Gomes', screen_name: 'fernando_tech', bio: 'DevOps Engineer | Kubernetes & Docker expert ⚙️', location: 'Manaus, Brasil', img: 45 },
  { name: 'Patricia Martins', screen_name: 'pat_martins', bio: 'Frontend Developer | Vue.js enthusiast 💚', location: 'Florianópolis, Brasil', img: 50 },
  { name: 'Thiago Ribeiro', screen_name: 'thiago_code', bio: 'Software Architect | Cloud Solutions | AWS Certified', location: 'Campinas, Brasil', img: 55 },
  { name: 'Camila Torres', screen_name: 'cami_torres', bio: 'QA Engineer | Automation Testing | Selenium & Cypress', location: 'Vitória, Brasil', img: 60 },
  { name: 'Diego Cardoso', screen_name: 'diego_dev', bio: 'Game Developer | Unity & Unreal Engine 🎮', location: 'Goiânia, Brasil', img: 65 },
  { name: 'Amanda Dias', screen_name: 'amanda_ux', bio: 'UX Researcher | Design Thinking | Human-Centered Design', location: 'João Pessoa, Brasil', img: 70 },
  { name: 'Rodrigo Castro', screen_name: 'rod_castro', bio: 'Blockchain Developer | Web3 & Crypto enthusiast ₿', location: 'Natal, Brasil', img: 11 },
  { name: 'Larissa Mendes', screen_name: 'lari_tech', bio: 'Cybersecurity Analyst | Ethical Hacker | InfoSec', location: 'Aracaju, Brasil', img: 16 },
  { name: 'Bruno Barbosa', screen_name: 'bruno_dev', bio: 'iOS Developer | Swift & SwiftUI | Apple Platform Expert', location: 'Maceió, Brasil', img: 21 },
  { name: 'Gabriela Nunes', screen_name: 'gabi_nunes', bio: 'Tech Lead | Agile Coach | Scrum Master certified', location: 'Teresina, Brasil', img: 26 },
  { name: 'Marcelo Pinto', screen_name: 'marcelo_code', bio: 'Database Administrator | PostgreSQL & MongoDB expert', location: 'São Luís, Brasil', img: 31 }
];

// Mock user profile
const mockUser = (screenName, index = 0) => {
  const profile = userProfiles[screenName] || userProfiles['default'];
  const userId = 100000000 + (screenName.charCodeAt(0) * 1000000) + index;

  return {
    id: userId,
    id_str: userId.toString(),
    name: profile.name,
    screen_name: screenName,
    location: profile.location,
    description: profile.description,
    url: profile.url,
    entities: {
      url: {
        urls: [{
          url: "https://t.co/" + screenName.substring(0, 10),
          expanded_url: profile.url,
          display_url: profile.url.replace('https://', '').replace('http://', ''),
          indices: [0, 23]
        }]
      },
      description: { urls: [] }
    },
    protected: false,
    followers_count: profile.followers_count,
    friends_count: profile.friends_count,
    listed_count: Math.floor(profile.followers_count / 100),
    created_at: profile.created_at,
    favourites_count: Math.floor(profile.statuses_count * 0.8),
    utc_offset: null,
    time_zone: null,
    geo_enabled: true,
    verified: profile.verified,
    statuses_count: profile.statuses_count,
    lang: null,
    contributors_enabled: false,
    is_translator: false,
    is_translation_enabled: false,
    profile_background_color: "F5F8FA",
    profile_background_image_url: "http://abs.twimg.com/images/themes/theme1/bg.png",
    profile_background_image_url_https: "https://abs.twimg.com/images/themes/theme1/bg.png",
    profile_background_tile: false,
    profile_image_url: profile.profile_image,
    profile_image_url_https: profile.profile_image,
    profile_banner_url: profile.profile_banner,
    profile_link_color: "1DA1F2",
    profile_sidebar_border_color: "C0DEED",
    profile_sidebar_fill_color: "DDEEF6",
    profile_text_color: "333333",
    profile_use_background_image: true,
    has_extended_profile: false,
    default_profile: false,
    default_profile_image: false,
    following: false,
    follow_request_sent: false,
    notifications: false,
    translator_type: "none"
  };
};

// Mock tweet
const mockTweet = (id, text, screenName, hasMedia = false) => {
  const tweet = {
    created_at: "Wed Oct 10 20:19:24 +0000 2018",
    id: id,
    id_str: id.toString(),
    text: text,
    truncated: false,
    entities: {
      hashtags: [],
      symbols: [],
      user_mentions: [],
      urls: []
    },
    source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: mockUser(screenName),
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: false,
    retweet_count: Math.floor(Math.random() * 100),
    favorite_count: Math.floor(Math.random() * 200),
    favorited: false,
    retweeted: false,
    lang: "en"
  };

  if (hasMedia) {
    const imageId = (id % 1000) + 1;
    const imageUrl = `https://picsum.photos/800/600?random=${imageId}`;
    tweet.extended_entities = {
      media: [{
        id: id + 100,
        id_str: (id + 100).toString(),
        indices: [0, 23],
        media_url: imageUrl,
        media_url_https: imageUrl,
        url: "https://t.co/sample",
        display_url: "pic.twitter.com/sample",
        expanded_url: `https://twitter.com/${screenName}/status/${id}/photo/1`,
        type: "photo",
        sizes: {
          thumb: { w: 150, h: 150, resize: "crop" },
          large: { w: 800, h: 600, resize: "fit" },
          medium: { w: 800, h: 600, resize: "fit" },
          small: { w: 680, h: 510, resize: "fit" }
        }
      }]
    };
    tweet.entities.media = tweet.extended_entities.media;
  }

  return tweet;
};

// GET /users/show.json
router.get('/users/show.json', (req, res) => {
  const screenName = req.query.screen_name || 'sampleuser';
  res.json(mockUser(screenName));
});

// GET /followers/list.json
router.get('/followers/list.json', (req, res) => {
  const screenName = req.query.screen_name || 'sampleuser';
  const users = randomFollowers.map((follower, i) => {
    const userId = 200000000 + i * 1000;
    return {
      ...mockUser(follower.screen_name, i),
      id: userId,
      id_str: userId.toString(),
      name: follower.name,
      description: follower.bio,
      location: follower.location,
      profile_image_url: `https://i.pravatar.cc/400?img=${follower.img}`,
      profile_image_url_https: `https://i.pravatar.cc/400?img=${follower.img}`,
      profile_banner_url: `https://picsum.photos/1500/500?random=${follower.img + 10}`,
      followers_count: Math.floor(Math.random() * 10000) + 500,
      friends_count: Math.floor(Math.random() * 2000) + 200,
      statuses_count: Math.floor(Math.random() * 5000) + 100
    };
  });
  res.json({
    users: users,
    next_cursor: 0,
    next_cursor_str: "0",
    previous_cursor: 0,
    previous_cursor_str: "0"
  });
});

// GET /statuses/user_timeline.json
router.get('/statuses/user_timeline.json', (req, res) => {
  const screenName = req.query.screen_name || 'sampleuser';
  const count = parseInt(req.query.count) || 20;
  const includeRts = req.query.include_rts !== 'false';

  const tweets = [];

  // Realistic tweet content based on screen name
  const tweetTemplates = screenName === 'americanascom' ? [
    "🔥 OFERTA IMPERDÍVEL! Confira os melhores preços em eletrônicos. Aproveite enquanto durarem os estoques!",
    "📱 Smartphones com até 40% OFF! Não perca essa oportunidade incrível. #BlackFriday #Ofertas",
    "🎮 Gamers, essa é pra vocês! Consoles e jogos com descontos incríveis. Corre que está acabando!",
    "👗 Moda com até 50% de desconto! Renove seu guarda-roupa com estilo e economia. #Moda #Promoção",
    "🏠 Eletrodomésticos com preços que você nunca viu! Transforme sua casa gastando menos.",
    "📚 Livros com frete grátis! Mergulhe em grandes histórias com descontos especiais.",
    "⌚ Relógios e acessórios em promoção! Presente perfeito com preço especial.",
    "🎧 Áudio e tecnologia com os melhores preços do mercado. Confira agora!",
    "🌟 Cliente Americanas sempre em primeiro lugar! Obrigado pela confiança de sempre. ❤️",
    "💻 Notebooks e tablets com condições imperdíveis! Produtividade nunca foi tão acessível.",
    "🎁 Ideias de presente para todas as ocasiões. Encontre o presente perfeito aqui!",
    "📦 Frete grátis em compras acima de R$ 99! Aproveite para garantir suas compras.",
    "🏃‍♂️ Corre que é por tempo limitado! Ofertas que você não pode deixar passar.",
    "⭐ Avaliações 5 estrelas! Veja o que nossos clientes estão dizendo sobre nossas ofertas.",
    "🎉 Promoção de aniversário! Descontos especiais em toda a loja. Vem comemorar com a gente!",
    "🔔 Ative as notificações para não perder nenhuma oferta exclusiva!",
    "💳 Parcele em até 10x sem juros! Facilidade no pagamento para você comprar mais.",
    "🚚 Entrega rápida e segura! Receba seus produtos com toda comodidade.",
    "🌈 Variedade que só a Americanas tem! Milhares de produtos para você escolher.",
    "💝 Especial Dia das Mães! Presentes com muito amor e descontos especiais."
  ] : [
    "Just shipped a new feature! Really excited about this one 🚀",
    "Working on some interesting problems today. Love the challenge! 💻",
    "Coffee fueled coding session ☕ #DeveloperLife",
    "Attending an amazing tech conference today. So many great talks! 🎤",
    "Open source contribution merged! Small wins matter 🎉",
    "Debugging is like being a detective in a crime movie where you're also the murderer 🔍",
    "The best code is no code at all. Keep it simple! ✨",
    "Learning never stops in tech. Just discovered something cool! 📚",
    "Team collaboration makes everything better. Grateful for amazing colleagues! 🤝",
    "Weekend project coming along nicely. Can't wait to share it! 🛠️",
    "Reading through documentation and finding hidden gems 💎",
    "Refactoring old code is so satisfying! Clean code = happy developer 😊",
    "Another successful deployment! Time to celebrate 🎊",
    "Pair programming session was super productive today 👥",
    "Testing in production... just kidding! Test your code, folks! 🧪",
    "The importance of good documentation cannot be overstated 📝",
    "Attending a workshop on best practices. Always room to improve! 🎓",
    "Code review feedback is a gift. Embrace it! 💡",
    "Building tools that make developers' lives easier is my passion ❤️",
    "Remember: premature optimization is the root of all evil 🌱"
  ];

  for (let i = 0; i < Math.min(count, 100); i++) {
    const id = 1000000000000 + i;
    const text = tweetTemplates[i % tweetTemplates.length];
    // Every 4th tweet has media
    const hasMedia = i % 4 === 0;
    tweets.push(mockTweet(id, text, screenName, hasMedia));
  }

  res.json(tweets);
});

// GET /users/suggestions.json
router.get('/users/suggestions.json', (req, res) => {
  res.json([
    {
      name: "Technology",
      slug: "technology",
      size: 100
    },
    {
      name: "News",
      slug: "news",
      size: 200
    },
    {
      name: "Sports",
      slug: "sports",
      size: 150
    }
  ]);
});

// GET /users/suggestions/:slug.json
router.get('/users/suggestions/:slug.json', (req, res) => {
  const slug = req.params.slug;

  // Pick random followers for suggestions
  const shuffled = [...randomFollowers].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  const users = selected.map((follower, i) => {
    const userId = 300000000 + i * 1000;
    return {
      ...mockUser(follower.screen_name, i),
      id: userId,
      id_str: userId.toString(),
      name: follower.name,
      description: follower.bio,
      location: follower.location,
      profile_image_url: `https://i.pravatar.cc/400?img=${follower.img}`,
      profile_image_url_https: `https://i.pravatar.cc/400?img=${follower.img}`,
      profile_banner_url: `https://picsum.photos/1500/500?random=${follower.img + 20}`,
      followers_count: Math.floor(Math.random() * 50000) + 1000,
      friends_count: Math.floor(Math.random() * 3000) + 300,
      statuses_count: Math.floor(Math.random() * 8000) + 200
    };
  });

  res.json({
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    slug: slug,
    size: users.length,
    users: users
  });
});

// GET /trends/place.json
router.get('/trends/place.json', (req, res) => {
  const trendTopics = [
    { name: '#BlackFriday', volume: 2847392 },
    { name: '#TechNews', volume: 1523441 },
    { name: 'Inteligência Artificial', volume: 987234 },
    { name: '#Programação', volume: 754821 },
    { name: 'Copa do Mundo', volume: 3245678 },
    { name: '#DevLife', volume: 456789 },
    { name: 'JavaScript', volume: 623451 },
    { name: '#Ofertas', volume: 1876543 },
    { name: 'React', volume: 534219 },
    { name: '#CyberMonday', volume: 1234567 }
  ];

  const trends = trendTopics.map((trend, i) => ({
    name: trend.name,
    url: `https://twitter.com/search?q=${encodeURIComponent(trend.name)}`,
    promoted_content: null,
    query: encodeURIComponent(trend.name),
    tweet_volume: trend.volume
  }));

  res.json([{
    trends: trends,
    as_of: new Date().toISOString(),
    created_at: new Date().toISOString(),
    locations: [{
      name: "Brasil",
      woeid: 23424768
    }]
  }]);
});

module.exports = router;
