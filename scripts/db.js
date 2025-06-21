// scripts/db.js
import 'dotenv/config';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USERNAME = 'root',
  DB_PASSWORD = '',
  DB_DATABASE,
} = process.env;

if (!DB_DATABASE) {
  console.error('❌ Environment variable DB_DATABASE is missing in .env');
  process.exit(1);
}

const MIGRATE_FILE = path.resolve('src/database/schema.migrate.sql');
const SEED_FILE = path.resolve('src/database/schema.seed.sql');

async function createRootConnection() {
  return mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    multipleStatements: true,
  });
}

async function connectToDatabase() {
  return mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    multipleStatements: true,
  });
}

async function createDatabaseIfNotExists() {
  const conn = await createRootConnection();
  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  console.log(`✅ Database '${DB_DATABASE}' ensured.`);
  await conn.end();
}

async function checkConnection() {
  try {
    const conn = await connectToDatabase();
    await conn.query('SELECT 1');
    console.log('✅ Database connection successful.');
    await conn.end();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

async function migrate() {
  if (!fs.existsSync(MIGRATE_FILE)) {
    console.error('❌ schema.migrate.sql file not found.');
    return;
  }

  const conn = await connectToDatabase();
  const sql = fs.readFileSync(MIGRATE_FILE, 'utf8');
  const statements = sql.split(/;\s*\n/);

  for (const stmt of statements) {
    if (stmt.trim()) {
      await conn.query(stmt);
    }
  }

  console.log('📦 Migration completed.');
  await conn.end();
}

async function seed() {
  if (!fs.existsSync(SEED_FILE)) {
    console.error('❌ schema.seed.sql file not found.');
    return;
  }

  const conn = await connectToDatabase();
  const sql = fs.readFileSync(SEED_FILE, 'utf8');
  const statements = sql.split(/;\s*\n/);

  for (const stmt of statements) {
    if (stmt.trim()) {
      await conn.query(stmt);
    }
  }

  console.log('🌱 Seeding completed.');
  await conn.end();
}

async function resetDatabase() {
  const conn = await createRootConnection();
  await conn.query(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
  console.log(`🗑️ Database '${DB_DATABASE}' dropped.`);
  await conn.end();

  await createDatabaseIfNotExists();
  await migrate();
  await seed();
}

async function listTables() {
  const conn = await connectToDatabase();
  const [rows] = await conn.query('SHOW TABLES');
  const tableNames = rows.map(row => Object.values(row)[0]);
  console.log('📋 Tables:', tableNames.join(', ') || '[None]');
  await conn.end();
}

async function queryTable(tableName) {
  const conn = await connectToDatabase();
  const [rows] = await conn.query(`SELECT * FROM \`${tableName}\``);
  console.log(JSON.stringify(rows, null, 2));
  await conn.end();
}

async function main() {
  const cmd = process.argv[2];
  const arg = process.argv[3];

  switch (cmd) {
    case 'create-db':
      return createDatabaseIfNotExists();
    case 'check':
      return checkConnection();
    case 'migrate':
      return migrate();
    case 'seed':
      return seed();
    case 'reset':
      return resetDatabase();
    case 'tables':
      return listTables();
    case 'query':
      if (!arg) {
        console.error('❗ Please provide table name: query <table>');
        return;
      }
      return queryTable(arg);
    default:
      console.log(`
🛠️ Available commands:
  yarn db:create-db     - Ensure database exists
  yarn db:check         - Test connection to database
  yarn db:migrate       - Run migration file
  yarn db:seed          - Run seed file
  yarn db:reset         - Drop and reinitialize database
  yarn db:tables        - Show existing tables
  yarn db:query <table> - Print contents of table
`);
  }
}

main();
