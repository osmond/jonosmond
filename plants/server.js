import express from 'express';
import cors from 'cors'; // Import cors package
import fetch from 'node-fetch'; // Assuming node-fetch v3.x which supports ESM

const app = express();
const PORT = 3001;

const API_BASE_URL = 'https://trefle.io/api/v1/plants/search';
const API_KEY = 'lA4HbEaBUtZGsHyjIFFy7Hvw6qHTkaZru69rEeWWGAI'; // Ensure you replace this with your actual API key

// Use cors middleware to allow all origins
// For production, you might want to configure this to allow only specific origins
app.use(cors());

app.use(express.json());

app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(`${API_BASE_URL}?token=${API_KEY}&q=${query}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Trefle:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
