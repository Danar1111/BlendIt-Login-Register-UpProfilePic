const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const db = require('./config/db');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());
app.use(authRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: true, message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: true, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  db.execute('SELECT 1')
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error('Database connection failed:', err);
    });
});
