import jwt from 'jsonwebtoken'
import knex from '../config/dbKnex.js'
import config from '../config/config.js'
import pool from '../config/pool.js'
import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'
import formidable from 'formidable'
import trimString from '../helpers/trimString.js'
import {operatorRegistrationEmail} from './email.js'

let unTrim=trimString.unTrim

export async function handleRegistrationOperator(req,res) {
    let operator=req.body
    operatorRegistrationEmail(
        operator.email,
        operator.name, 
        operator.lastname, 
        operator.username,
        operator.cellphone,
        operator.password);

    let username=operator.username;
    let email=operator.email;
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
            
            pool.query(
                knex('company').select('*')
                .where({username:username}).orWhere({email:email}).toString()+';'
                )
                .then((result)=>{
                    if(result.rowCount>0){
                        if(result.rows[0].username==username){
                            throw new Error(`Postoji korisnik username: ${username}`);
                        }
                        else if(result.rows[0].email==email){
                            throw new Error(`Postoji korisnik email: ${email}`);
                        }
                    }
                    bcrypt.hash(operator.password,8,(err,hash)=>{
                        if(err)
                            throw err;
                        operator.password=hash;
                        pool.query(knex('operator').insert(operator).toString()+";")
                        .then((result)=>{res.send({'message':'OK'})})
                        .catch((err)=>{throw err})
                    })
                })
                .catch((err)=>{
                    const message=err.message;
                    res.send({'message':message})
                });
        })
        .catch((err)=>{
            const message=err.message;
            res.send({'message':message})
        })
};

export function getAnswersByID(req,res){
    const id=req.params.id;
    let response=[]
    pool.query(knex('answers').select('*').where({role:'operator',role_id:id}).toString()+';')
    .then((result)=>{
        console.log(result)
        for(let i=0;i<result.rowCount;i++){
            let tmp={};
            tmp.answer=result.rows[i].answer;
            tmp.questionid=result.rows[i].question_id;
            tmp.id=result.rows[i].role_id;
            tmp.profiletype=result.rows[i].profiletype;
            response.push(tmp)
        }
        res.send(response)
    }).catch((err)=>{console.log(err)})
}

export async function calculateProfile(req,res){
    const {id} = req.params;
    let operatorAnswers=await pool.query(
        knex('answers').select('*').where({
            role_id:id,
            role:"operator"}).toString()+';')
    let operatorQuestion=await pool.query(
        knex('question').select('*').whereNot({typeprofile:'company'}).toString()+';')
    let count=30;
    count+=(operatorAnswers.rowCount/operatorQuestion.rowCount)*70;
    count=Math.round(count);
    res.send({"count":count})
}

export async function getNumberDeclinedInvite(req,res){
    const {id} =req.params;
    try{
        let operatorAnswers=await pool.query(
            knex('operator').select('decline_requests').where({id:id}).toString()+';'
            )
        let declined=operatorAnswers.rows[0].decline_requests;
        console.log(declined)
        res.send({"declined":declined});
    }
    catch(err){
        console.log(err)
        res.send({"declined":0})
    }
}

export async function getNumberAcceptedInvite(req,res){
    const {id} =req.params;
    try{
        let operatorAnswers=await pool.query(
            knex('operator').select('accept_requests').where({id:id}).toString()+';'
            )
        let accepted=operatorAnswers.rows[0].accept_requests;
        res.send({"accepted":accepted});
    }
    catch(err){
        console.log(err)
        res.send({"accepted":0})
    }
}

export async function getNewInvite(req,res){
    const {id} =req.params;
    try{
        let operator=await pool.query(
            knex('operator').select('*').where({id:id}).toString()+';'
            )
        let declined=operator.rows[0].decline_requests;
        let accepted=operator.rows[0].accept_requests;
        let sum = operator.rows[0].invitations==null ? 0:operator.rows[0].invitations.length;
        let all=sum-declined-accepted;
        console.log(declined,accepted,sum)
        res.send({"new":all})
    }
    catch(err){
        console.log(err)
        res.send({"new":0})
    }
}