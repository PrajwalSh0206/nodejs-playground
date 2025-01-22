const { redisClient } = require("../../config/redis");

const map = new Map();

const createShortner = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    const shortId = crypto.randomUUID();

    await redisClient.set(shortId, originalUrl);
    await redisClient.set(`${shortId}:count`, 0);

    map.set(shortId, {
      originalUrl,
    });

    res.status(201).json({ shortUrl: `${req.protocol}://${req.get("host")}/shortner/${shortId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchShortner = async (req, res) => {
  const { shortId } = req.params;

  try {
    const urlEntry = await redisClient.get(shortId);
    
    if (!urlEntry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(urlEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  fetchShortner,
  createShortner,
};
