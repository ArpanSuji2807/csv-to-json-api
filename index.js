const express = require('express');
const uploadData = require('./controllers/uploadController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/upload', uploadData);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});