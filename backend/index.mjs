import express from 'express';

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Ruwalk Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
