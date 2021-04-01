import jwt from 'jsonwebtoken'
import knex from '../config/dbKnex.js'
import config from '../config/config.js'
import bcrypt from 'bcrypt'
import pool from '../config/pool.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import 'dotenv/config.js';
import sgMail from '@sendgrid/mail';

import {handleLoggingCompany,companyChangePassword,getProfileData} from '../helpers/login.js'

export function handleLoggingUser(req,res){
    const username=req.body.username;
    const password=req.body.password;
    getProfileData(username,password).then(function(result){res.send(result)})
                                        .catch(function(err){res.send(err)})
} 

export function changePassword(req,res){
    const {username,newPassword,oldPassword}=req.body;
    
    console.log(username,newPassword,oldPassword)
    pool.query(
            knex('operator').select('password').where({username:username}).toString()+';'
            )
            .then((result)=>{
                if(result.rowCount==0) throw RangeError
                bcrypt.compare(oldPassword,result.rows[0].password,(err,reslt)=>{
                    if(err){throw err}
                    if(reslt){
                        bcrypt.hash(
                            newPassword,8,(err,hash)=>{
                                if(err){throw err}
                                let knexBuilder=knex('operator').update({password:hash})
                                                        .where({username:username}).toString();
                                pool.query(knexBuilder+";")
                                    .then(
                                        res.send({"message":"OK"})
                                    ).catch((e)=>console.log(e));
                            })
                    }
                    else throw TypeError
                })
        })
        .catch((err)=>{
            console.log(err)
            if(err==RangeError){
                companyChangePassword(username,newPassword,oldPassword,res)
            }
            else if(err==TypeError){
                res.send({"message":"bad password"})
            }
        })
}

export async function sendResetPasswordEmail(req,res){
    const {email}=req.body;
    //console.log(email)
    try{
        let operatorResult=await pool.query(knex('operator').select('*')
            .where({email:email}).toString()+';')
        let companyResult=await pool.query(knex('company').select('*')
            .where({email:email}).toString()+';')
        if(operatorResult.rowCount==0 && companyResult.rowCount==0){
            res.send({"message":"los email"})
        }
        else{
            let result=operatorResult.rowCount>companyResult.rowCount ? 
                operatorResult.rows[0] : companyResult.rows[0];
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
               service : 'gmail',
                auth: {
                    user: 'jovicamdfk@gmail.com', // generated ethereal user
                    pass: '28061389', // generated ethereal password
                },
            });
            let token=crypto.randomBytes(20).toString('hex');
            let expireDate=Date.now()+60*60*12;
            let html=
            `<!DOCTYPE html>
            <html>
            <body>
            <h1>Zaboravili ste sifru?</h1>
            <h1>Vaši podaci:</h1>
            <p>Email: ${result.email}</p>
            <p>Ime: ${result.name}</p>
            <p>Prezime: ${result.lastname}</p>
            <p>Username: ${result.username}</p>
            <p>Ukoliko ovo niste Vi, molimo Vas da ignorisete email</p>
            <a href="http://localhost:8081/reset/${email}/${token}">
                Promeni sifru
            </a>
            </body>
            </html>`;
            const msg = {
                to: email, 
                from: "terza98@hotmail.rs",
                subject: "Vaš zahtev za sifrom je odobren!",
                html: html,
            }
            console.log(result)
            sgMail.send({
            to: result.email, 
            from: "terza98@hotmail.rs",
            subject: "Stigao je novi zahtev",
            html: html,
            })
            /*let info = await transporter.sendMail({
                from: 'jovica98@gmail.com', // sender address
                to: email, // list of receivers
                subject: "Reset password", // Subject line
                text: "Reset password", // plain text body
                html: html, // html body
            });*/
            await pool.query(
                knex('reset_password').insert({
                    email:email,
                    token:token,
                    expiredate:expireDate
                }).toString()+';')
            res.send({"message":"poslat je email za reset sifre"})
        }
    }
    catch(err){
        console.log(err);
    }
}

export async function handleResetPassword(req,res){
    const {email,password,token}=req.body;
    console.log(email,password,token)
    try{
        let operatorResult=await pool.query(knex('operator').select('*')
            .where({email:email}).toString()+';')
        let companyResult=await pool.query(knex('company').select('*')
            .where({email:email}).toString()+';')
        if(operatorResult.rowCount==0 && companyResult.rowCount==0){
            res.send({"message":"los email"})
        }
        else{
            let table=operatorResult.rowCount>companyResult.rowCount ? 
                'operator' : 'company';
            //let result=await pool.query(
               // knex('reset_password').select('*').where({email:email,token:token}).toString()+';')
            //if(result.rowCount==0){
                //res.send({"message":"los email za reset password"})
            //}
            //else{
               // if(result.rows[0].expiredate > Date.now()){
                    //res.send({"message":"Isteklo je vreme za reset sifre"})
                //}
                //else{
                    bcrypt.hash(password,8,(err,hash)=>{
                        if(err){throw err}
                        pool.query(knex(table).update({password:hash})
                                .where({email:email}).toString()+";")
                        .catch((err)=>{throw err})
                    })
                    res.send({"poruka":"Uspesno promenjena sifra"})
                }
                /*await pool.query(
                    knex('reset_password').del().where({
                        email:email,
                        token:token
                    }).toString()+';')
                res.send({"message":"Uspesno resetovana sifra"})*/
            }
    
   // }
    catch(err){
        console.log(err)
    }
}