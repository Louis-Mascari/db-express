const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'friendsdb',
  port: 5432,
});

// Express route to get a list of friends
app.get('/friends', async (req, res) => {
  try {
    // Query the database
    const result = await pool.query('SELECT * FROM friends');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
