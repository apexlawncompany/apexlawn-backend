import pool from '../config/db.js';

export const createUserService = async (data) => {
    const {email, password,created_at,updated_at,first_name,last_name} = data;
    const result = await pool.query('INSERT INTO users (email,password,created_at,updated_at,first_name,last_name) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *', [email,password,created_at,updated_at,first_name,last_name]);
    return result.rows[0];
}

export const getUserByEmailService = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

export const getUserByIdService = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}