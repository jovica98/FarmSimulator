//import pool from '../config/db.js'
import jwt from 'jsonwebtoken'
import knex from '../config/dbKnex.js'
import config from '../config/config.js'
import bcrypt from 'bcrypt'
import pool from '../config/pool.js'
import {handleRegruterLogin} from '../handlers/regruter.js'

export function handleLoggingCompany(username,password){
    try{
        return new Promise(function(resolve,reject){
            let query=knex('company').select('*').where({
                username:username,
                acceptregistration:true
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
                                if(res){
                                        const { password,comments, ...data } = result.rows[0];
                                        data.role="company"
                                        let token=jwt.sign({id:data.id},config.secret,{expiresIn:86400});
                                        return resolve({token,data});
                                }
                                else{
                                    //console.log("from company",handleRegruterLogin(username,password))
                                    return resolve(handleRegruterLogin(username,password))
                                    //return resolve({"message":"Bad username or password"})
                                } 
                    })
                } 
                else {
                    //console.log("from company2",handleRegruterLogin(username,password))
                    resolve(handleRegruterLogin(username,password))
                }
            })
        });
    }
    catch(e){return e}
} 

export function companyChangePassword (username,newPassword,oldPassword){
    pool.query(
            knex('company').select('password').where({username:username}).toString()+';'
            )
            .then((result)=>{
                if(result.rowCount==0) throw RangeError
                bcrypt.compare(oldPassword,result.rows[0].password,(err,reslt)=>{
                    if(err){throw err}
                    if(reslt){
                        bcrypt.hash(
                            newPassword,8,(err,hash)=>{
                                if(err){throw err}
                                pool.query(
                                    knex('company').update({password:hash})
                                    .where({username:username}).toString()+";")
                                    .then(
                                        res.send({"message":"OK"})
                                    ).catch((e)=>console.log(e));
                            })
                    }
                    else throw TypeError
                })
        })
        .catch((err)=>{
            if(err==RangeError){
                res.send({"message":"bad username"})
            }
            else if(err==TypeError){
                res.send({"message":"bad password"})
            }
        })
}

export async function getProfileData(username,password){
    try{
        return new Promise(function(resolve,reject){ 
            pool.query(knex('operator').select('*').where({username:username,status:"active"}).toString()+';',
            function(err,result){
                if (err) {
                    return reject(err);
                }
                
                if(result.rowCount>0){
                    bcrypt.compare(password,result.rows[0].password,(err,res)=>{
                                if(err){
                                        return reject(err)
                                }
                                if(res){
                                    const { comments,password, ...data } = result.rows[0];
                                        let token=jwt.sign({id:data.id},config.secret,{expiresIn:86400});                  
                                        data.role="operator"
                                        return resolve({token,data});
                                }
                                else {
                                    handleLoggingCompany(username,password)
                                        .then(function(result){return resolve(result);})
                                        .catch(function(err){console.log(err)})  
                                }  
                            })
                }
                else {
                    handleLoggingCompany(username,password)
                    .then(function(result){return resolve(result);})
                    .catch(function(err){console.log(err)})  
                }
            })
        })
    }
    catch(e) {return e}   
}