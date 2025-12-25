const { mockUser, randomFollowers } = require('../../_lib/mock-data');

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

  res.status(200).json({
    users: users,
    next_cursor: 0,
    next_cursor_str: "0",
    previous_cursor: 0,
    previous_cursor_str: "0"
  });
};
