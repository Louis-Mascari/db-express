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

app.get('/friends', async (req, res) => {
    console.log('made it here');
    try {
      console.log('Request received for /friends'); // Add this line
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
