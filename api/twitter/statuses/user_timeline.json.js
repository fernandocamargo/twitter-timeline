const { mockTweet, tweetTemplates } = require('../../_lib/mock-data');

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const screenName = req.query.screen_name || 'sampleuser';
  const count = parseInt(req.query.count) || 20;
  const includeRts = req.query.include_rts !== 'false';
  const maxId = req.query.max_id;

  // If pagination is requested (max_id provided), return empty array
  if (maxId) {
    return res.status(200).json([]);
  }

  const templates = tweetTemplates[screenName] || tweetTemplates.default;
  const tweets = [];
  const numTweets = 30;

  for (let i = 0; i < numTweets; i++) {
    const id = 1000000000000 + i;
    const text = templates[i % templates.length];
    const hasMedia = i % 3 === 0;
    tweets.push(mockTweet(id, text, screenName, hasMedia, i));
  }

  res.status(200).json(tweets);
};
