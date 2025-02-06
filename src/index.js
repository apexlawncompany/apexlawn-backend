import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import catalogRouts from './routes/catalogRoutes.js';
import errorHandling from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

/**
 *  Middleware
 */

app.use(express.json());
app.use(cors());

/**
 *  Routs
 */

app.use('/api', catalogRouts);

/**
 *  error handling
 */

app.use(errorHandling);

app.get('/', async (req, res) => {
  console.log('start db testing');
  const result = await pool.query('SELECT current_database()');
  console.log('End db');

  res.send(
    `The database name  ${JSON.stringify(result?.rows[0].current_database)}`
  );
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
