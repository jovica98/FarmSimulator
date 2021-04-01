import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const Pool = pg.Pool;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: true,
	max: 20,
});
console.log(process.env.DATABASE_URL);
export default pool;
