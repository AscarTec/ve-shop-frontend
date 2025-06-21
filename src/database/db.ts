import mysql, { Connection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { env } from '@/config/env';

if (!env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL is not set in environment');
}

/**
 * Establish database connection
 */
export async function getConnection(): Promise<Connection> {
  return mysql.createConnection(env.DATABASE_URL);
}

/**
 * Get all records from a table
 */
export async function fetchAll<T = Record<string, unknown>>(table: string): Promise<T[]> {
  const conn = await getConnection();
  const [rows] = await conn.query<RowDataPacket[]>(`SELECT * FROM \`${table}\``);
  await conn.end();
  return rows as T[];
}

/**
 * Insert a record into a table
 */
export async function insert(table: string, data: Record<string, unknown>) {
  const conn = await getConnection();
  const [result] = await conn.query<ResultSetHeader>(
    `INSERT INTO \`${table}\` SET ?`, [data]
  );
  await conn.end();
  return result;
}

/**
 * Update a record by ID
 */
export async function updateById(table: string, id: number, data: Record<string, unknown>) {
  const conn = await getConnection();
  const [result] = await conn.query<ResultSetHeader>(
    `UPDATE \`${table}\` SET ? WHERE id = ?`, [data, id]
  );
  await conn.end();
  return result;
}

/**
 * Delete a record by ID
 */
export async function deleteById(table: string, id: number) {
  const conn = await getConnection();
  const [result] = await conn.query<ResultSetHeader>(
    `DELETE FROM \`${table}\` WHERE id = ?`, [id]
  );
  await conn.end();
  return result;
}
