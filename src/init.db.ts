import * as path from 'path';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';

// Bestimme die richtige .env-Datei basierend auf NODE_ENV
const nodeEnv = process.env.NODE_ENV || 'development';
const envFilePath = nodeEnv === 'test' ? path.resolve(__dirname, '../.env.test') : path.resolve(__dirname, '../.env');

// Lade Umgebungsvariablen aus der entsprechenden .env-Datei
dotenv.config({ path: envFilePath });

console.log(`Current NODE_ENV: ${nodeEnv}`);
console.log(`ENV_VAR: ${process.env.ENV_VAR}`);
console.log('Process environment', process.env);

// PostgreSQL Konfiguration aus Umgebungsvariablen laden
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

export async function initializeDatabase() {
  await new Promise(resolve => setTimeout(resolve, 6000));

  const client = await pool.connect();

  try {
    // Tabelle erstellen, falls sie nicht existiert
    await client.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      )
    `);

    // Wert einfügen
    const res = await client.query(`
      INSERT INTO test_table (name)
      VALUES ($1)
      RETURNING *
    `, ['Test Value']);

    console.log('Inserted row:', res.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    client.release();
  }

  await pool.end(); // Verbindung beenden
}
