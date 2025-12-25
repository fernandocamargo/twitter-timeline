const { mockUser, randomFollowers } = require('../../../_lib/mock-data');

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const slug = req.query.slug;

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

  res.status(200).json({
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    slug: slug,
    size: users.length,
    users: users
  });
};
