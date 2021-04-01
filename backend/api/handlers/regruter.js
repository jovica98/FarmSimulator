import knex from '../config/dbKnex.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/pool.js'
import config from '../config/config.js'


import { newPasswordEmail } from './email.js'


const API_URL="http://localhost:5000/";

export function acceptRequestForMembership(req,res){
    
    const {id,password,email}=req.body
    console.log(id,password,email)
    newPasswordEmail(email,password);
    let knexResult;
    bcrypt.hash(password,8).then((hash)=>{
        console.log(hash)
        knexResult=knex('company').where({id:id})
        .update({acceptregistration:true,password:hash}).toString();
        pool.query(knexResult+";").then(res.send({"message":"OK"})).catch((err)=>console.log(err)) 
    }).catch((err)=>console.log(err))       
}        

export function seeRequestsForMembership(req,res){
    try{
        let knexResult=knex('company').select('*').where({acceptregistration:false}).toString();
        pool.connect((err,client,release)=>{
            if(err){console.log(err)}
            client.query(knexResult+";")
            .then((result)=>{
                res.send(JSON.stringify(result.rows));
            })
        })
        
    }catch(err){console.log(err);}
}

export function handleRegruterLogin(username,password){
    try{
        return new Promise(function(resolve,reject){
            let query=knex('regruter').select('*').where({
                username:username
            }).toString()
            pool.query(query+';',
            function(err,result){
                if (err) {
                    return reject(err);
                }
                if(result.rowCount>0){
                    bcrypt.compare(password,result.rows[0].password,(err,res)=>{
                                if(err){
                                    return reject(err)
                                }
                                console.log(res,password,result.rows[0].password)
                                if(res){
                                        const { password, ...data } = result.rows[0];
                                        data.role= data.is_admin===true ? "admin":"regrutor"
                                        let token=jwt.sign({id:data.id},config.secret,{expiresIn:86400});
                                        return resolve({token,data});
                                }
                                else{
                                    //console.log("from company",handleRegruterLogin(username,password))
                                    //return resolve(handleRegruterLogin(username,password))
                                    return resolve({"message":"Bad username or password"})
                                } 
                    })
                } 
                else {
                    //console.log("from company2",handleRegruterLogin(username,password))
                    //resolve(handleRegruterLogin(username,password))
                    return resolve({"message":"Losi podaci"})
                }
            })
        });
    }
    catch(e){return e}
}

export function handleShowAllRequests(req,res){
    let queryBuilder=knex('jobinvite')
                        .select('id','requireoperators','hired_operators','opendate','closedate','status',
                            'typeoperator','location')
                        .where({status:"otvoren"}).toString();
    
        pool.query(queryBuilder+";")
            .then((result)=>{
                for(let i=0;i<result.rowCount;i++){
                result.rows[i].opendate=niceDate(result.rows[i].opendate)
                result.rows[i].closedate=niceDate(result.rows[i].closedate)
                console.log(niceDate(result.rows[0].opendate))
                console.log(niceDate(result.rows[0].closedate))
            }
                res.send(result.rows)
            }).catch((e)=>res.send(e))
}

export function setStatusOperator(req,res){
    let {status,id}=req.body;
    pool.query(knex('operator').update({status:status}).where({id:id}).toString()+';')
    .then(()=>{res.send({"message":"Uspesno promenjen status"})})
    .catch((err)=>{res.send({"message":"Problem sa menjanjem statusa"})})
}

function niceDate(date){
    date=date+''
    
    date=date.substring(4,15)
    //date=Array.from(date)
    console.log(date)
    let year=date.substring(7,11)
    let month=date.substring(0,3)
    let day=date.substring(4,6)
    date=day+'.'+month+'.'+year+'.'
    console.log(date,'date2')
    return date
}

export async function getProfile(req,res){
    try{
        let {id,table}=req.params;
        console.log(table)
        let result=await pool.query(
            knex(table).select('*').where({id:id}).toString()+';')
        let data=result.rows[0]
        data.role=table
        res.send({visited:true,"response":{"data":data}})
    }
    catch(err){
        console.log(err)
        res.send({visited:false})
    }
}