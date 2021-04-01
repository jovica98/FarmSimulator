/*import pg from 'pg'
const {Client}=pg
const MAX_POOL_SIZE=25

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const client = new Client({
  connectionString:process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? true : false
  
})

pg.defaults.max=MAX_POOL_SIZE;

client.connect()
	.then(()=> {
		console.log(process.env.DATABASE_URL)
		//console.log(pg.defaults )			
	})
	.catch((err)=>console.log("ovde je "+err.stack))
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
//const client={"message":"client"}
//client.endConnection=endConnection()
export default client*/