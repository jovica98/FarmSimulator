import Knex from 'knex'


//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


let knex=new Knex({
    client: 'pg',
    connectionString:process.env.DATABASE_URL, 
    ssl:true,
    pool: { min: 0, max: 12 }
});
export default knex;
