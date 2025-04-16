// server.js
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// Route to handle balloon data requests
app.get('/balloon-data/:fileName', async (req, res) => {
  const { fileName } = req.params;
  const url = `https://a.windbornesystems.com/treasure/${fileName}`;
  console.log(`🔄 Fetching ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`⚠️ HTTP ${response.status} for ${fileName}`);
      return res.status(response.status).json({ error: `Upstream error: ${response.status}` });
    }

    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      console.error(`❌ JSON parse error for ${fileName}`, jsonErr.message);
      return res.status(500).json({ error: 'Invalid JSON format' });
    }

    res.json(data);
  } catch (error) {
    console.error(`❌ Failed to fetch ${fileName}:`, error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
