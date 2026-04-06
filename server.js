const express = require('express');
const path = require('path');
const app = express();

// REQUIRED for Render
const PORT = process.env.PORT || 3000;

// Correct path to public folder
const publicPath = path.join(__dirname, 'public');

// Serve static files
app.use(express.static(publicPath));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});