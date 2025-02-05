import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

/**
 *  Middleware
 */

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  console.log('start db testing');
  const result = await pool.query('SELECT current_database()');
  console.log('End db');

  res.send(
    `The database name  ${JSON.stringify(result?.rows[0].current_database)}`
  );
});

app.get('/catalog', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM catalog');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
