require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const plantsRouter = require('./routes/plants');
const identifyRouter = require('./routes/identify');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/plants', plantsRouter);
app.use('/identify', identifyRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Plant Care Backend API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
