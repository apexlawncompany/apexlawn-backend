import pool from '../config/db.js';

export const getAllCatalogService = async () => {
  const result = await pool.query('SELECT * FROM catalog');
  return result.rows;
};

export const getAllCatalogByIdService = async (id) => {
  const result = await pool.query('SELECT * from catalog where id =$1', [id]);
  return result.rows[0];
};
