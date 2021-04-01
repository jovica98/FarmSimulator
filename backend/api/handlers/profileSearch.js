import pool from "../config/pool.js"

export async function handleProfileSearch(req,res){
    let result=[];
    let status
    try{
        const filter=req.params.filter;
        const filterValue=req.params.filterValue;
        
        let operatorsSearchResult=await findOperators(filter,filterValue);
        let companiesSearchResult=await findCompanies(filter,filterValue);
        result[0]=(operatorsSearchResult.rows);
        result[1]=(companiesSearchResult.rows);
        status=200;
    }
    catch (e){
        console.log(e);
        status=404;
    }
    finally{
        res.header('content-type','application/json');
        res.send(result).status(200);
    }
}

export async function showAllProfiles(req,res){
    let company=await readAllCompanies()
    company=company.rows
    let operator=await readAllOperators()
    
    operator=operator.rows
    let response=[]
    response[0]=operator
    response[1]=company
    
    res.send(response)
}

export async function findOperators(filter,filterValue){
    try{
        const results=await pool.query(`select * from operator where lower(${filter}) Like lower('%${filterValue}%');`)
        return results;
    }
    catch(e){
        console.log(e)
    }
}

export async function findCompanies(filter,filterValue){
    try{
        const results=await pool.query(`select * from company where lower(${filter}) Like lower('%${filterValue}%');`)
        return results;
    }
    catch(e){
        console.log(e)
    }
}

async function readAllOperators(){
    try{
        const results=await pool.query('select * from operator;');
        return results;
    }
    catch(e){
        console.log(e)
    }
}

export async function readAllCompanies(){
    try{
        const results=await pool.query('select * from company;');
        return results;
    }
    catch(e){
        console.log(e)
    }
}

async function readAllOpenCompanies(){
    try{
        const results=await pool.query('select * from company where accpetregstration=false;');
        return results.rows;
    }
    catch(e){
       console.log(e)
    }
}