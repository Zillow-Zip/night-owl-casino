const express = require('express');
const app = express();

// REQUIRED PORT
const PORT = process.env.PORT || 3000;

// Serve all static files (index.html, css, js, assets)
app.use(express.static('.'));

// Health check route (important for testing)
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
