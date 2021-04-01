import jwt from 'jsonwebtoken'
import knex from '../config/dbKnex.js'
import config from '../config/config.js'
import bcrypt from 'bcrypt'
import pool from '../config/pool.js'
import {viewQuestionHandler} from './admin.js'
import {handleAddInvite} from './jobinvite.js'
import {handleAnswerOnQuestion,answerOnCompanyQuestion} from './question.js'
import {companyRegistrationEmail} from './email.js'

export async function handleRegistrationCompany(req,res) {
    res.header('content-type','application/json');
    let company=req.body
    companyRegistrationEmail(company.email,
        company.username,
        company.name,
        company.lastname,
        company.cellphone,
        company.companyname,
        company.mb);
    const {mb,username,email}=company;
    pool.query(
        knex('company').select('*')
        .where({username:username}).orWhere({email:email}).orWhere({mb:mb}).toString()+';'
    )
    .then(function(result){
        if(result.rowCount>0){
            if(result.rows[0].username==username){
                throw new Error(`Postoji korisnik username: ${username}`);
            }
            else if(result.rows[0].email==email){
                throw new Error(`Postoji korisnik email: ${email}`);
            }            
            else {
                throw new Error(`Postoji korisnik mb: ${mb}`);
            }
        }
        pool.query(
            knex('operator').select('*')
                .where({username:username}).orWhere({email:email}).toString()+';'
        )
            .then(function(result){
                if(result.rowCount>0){
                    if(result.rows[0].username==username){
                        throw new Error(`Postoji korisnik username: ${username}`);
                    }
                    else {
                        throw new Error(`Postoji korisnik email: ${email}`);
                    }
                }
                pool.query(knex('company').insert(company).toString()+";")
                .then((result)=>{res.send({'message':'OK'})})
                .catch((err)=>{throw err})  
            })
            .catch((err)=>{
                const message=err.message;
                res.send({'message':message})
            })
             
    })
    .catch((err)=>{
        const message=err.message;
        res.send({'message':message})
        });
}     

export function changeCompanyProperty(req,res){
    const{id,property,value}=req.body
    let prop= property.toString();
    pool.query(
        `update company set ${property} = $1 where id=$2 ;`,[value,id]
        ).then(()=>res.send({"message":`successfuly change ${property}`}))
        .catch((err)=>{console.log(err);res.send({"message":"error with changing property"})})
}