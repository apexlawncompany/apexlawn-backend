import pool from '../config/db.js';

export const getAllCatalogService = async () => {
  const result = await pool.query('SELECT * FROM catalog');
  return result.rows;
};

export const getAllCatalogByIdService = async (id) => {
  const result = await pool.query('SELECT * from catalog where id =$1', [id]);
  return result.rows[0];
};

export const createCatalogService = async (catalog) => {
  const result = await pool.query('INSERT INTO catalog (image, prices, title, description,inventory,variation) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [catalog.image, catalog.prices, catalog.title, catalog.description, catalog.inventory, catalog.variation]);
  return result.rows[0];
};


