const express = require('express');
const { Pool } = require('pg');
const config = require('./utils/config')
const LuckyNumber = require('./models/luckyNumber.js');
const app = express();

// PostgreSQL configuration
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'friendsdb',
  user: 'postgres',
  password: 'pass'
})

// Connect to PostgreSQL
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  });

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

// Define a route for the root path ("/") to fetch data from the "friends" table
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM friends');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/lucky', async (req, res) => {
  try {
    const result = await LuckyNumber.find({});
    res.json(result);
  } catch (error) {
    console.error('Error querying mongoDB:', error);
    res.status(500).send('Test Internal Server Error');
  }
});

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server is running`);
});
