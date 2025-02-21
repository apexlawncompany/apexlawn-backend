import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import catalogRouts from './routes/catalogRoutes.js';
import errorHandling from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import { catchAsync } from './utils/catchError.js';
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

app.use('/api/v1', catalogRouts);
app.use('/api/v1', authRoutes);
app.use('*', catchAsync(async (req, res) => {

  throw new Error(`${req.originalUrl} not found`);

}));

/**
 *  error handling
 */

app.use(errorHandling);

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT current_database()');
  res.send(
    `The database name  ${JSON.stringify(result?.rows[0].current_database)}`
  );
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
