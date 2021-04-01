import pool from '../config/pool.js'
import knex from '../config/dbKnex.js'

export function handleAddComments(req,res){
    const {table,id,comment,admin}=req.body;
    pool.query(knex('comments').del().where({profile_id:id}).toString()+';')
    pool.query(knex('comments').insert({
        profile_type:table,
        profile_id:id,
        comment_text:comment,
        regrutor_admin_id:admin
    }).toString()+';')
    .then(()=>{
        res.send({"message":"Uspesno dodat komentar"})
    })    
    .catch((err)=>{
        res.send({"message":"Neuspesno dodat komentar, proverite podatke"})
    })
}
    
export async function handleShowComments(req,res){
    const {table,id}=req.params;
    pool.query(knex('comments').select('*')
        .where({
            profile_id:id,
            profile_type:table
        }).toString()+';')
    .then((result)=>{
        console.log(result.row)
        if(result.rowCount==0){
            res.send({"comment":""})
        }

        else{
            let comment=result.rows[0].comment_text;
            res.send({"comment":comment})
        }
    })
    .catch((err)=>{
        res.send({"message":"Problem sa citanjem komentara"})
    })
}

export function handleDeleteComments(req,res){
    const {table,id,commentid}=req.params;

    pool.query(knex('comments').del()
        .where({
            profile_id:id,
            profile_type:table,
            comment_id:commentid
        }).toString()+';')
    .then((result)=>{
        res.send({"message":"Uspesno izbrisan komentar"})
    })
    .catch((err)=>{
        res.send({"message":"Problem sa brisanjem komentara"})
    })
}

export function handleEditComments(req,res){
    const {table,id,comment,admin}=req.body;
    pool.query(knex('comments').update({
        
        comment_text:comment
        
    }).where({
            profile_id:id,
            profile_type:table,
            comment_id:commentid
        }).toString()+';')
    .then(()=>{
        res.send({"message":"Uspesno dodat komentar"})
    })    
    .catch((err)=>{
        res.send({"message":"Neuspesno dodat komentar, proverite podatke"})
    })
}