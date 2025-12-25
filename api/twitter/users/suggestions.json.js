module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json([
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
};
