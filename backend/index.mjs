import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send('Ruwalk Backend Running');
});

app.get('/api/status', (req, res) => {
  res.json({
    app: "Ruwalk Backend",
    status: "OK",
    version: "0.1"
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
