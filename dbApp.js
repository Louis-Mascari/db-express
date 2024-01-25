const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3010;

// PostgreSQL configuration
const connectionString = "postgres://postgres:your_new_password@localhost:5432/friendsdb";
const pgClient = new Client(connectionString);

// Connect to PostgreSQL
pgClient.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  });

// Define a route for the root path ("/") to fetch data from the "friends" table
app.get('/', async (req, res) => {
  try {
    const result = await pgClient.query('SELECT * FROM friends');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
