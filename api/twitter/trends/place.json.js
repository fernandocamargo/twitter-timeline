module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

  res.status(200).json([{
    trends: trends,
    as_of: new Date().toISOString(),
    created_at: new Date().toISOString(),
    locations: [{
      name: "Brasil",
      woeid: 23424768
    }]
  }]);
};
