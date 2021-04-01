import fs from 'fs'
import path from 'path'

import knex from '../config/dbKnex.js'
import pool from '../config/pool.js'
import config from '../config/config.js'

import { StringDecoder } from 'string_decoder'
import trimString from '../helpers/trimString.js'
import multiparty from 'multiparty'

import formidable from 'formidable'

export function handleAddBlog(req,res){

        let {id,title,htmlString}=req.body;
        let knexBuilder
        title=trimString.fullTrim(title)
        fs.mkdir(`src/blogs/${title}`,{ recursive: true }, 
            (err) => {
                if (err) throw err;
                //let newImagePath=`src/blogs/${title.trim()}/${title.trim()}.png`;
                //fs.rename(files.img.path,newImagePath,(err)=>{console.log(err)})
                let htmlPath=`src/blogs/${title}/${title}.html`
                
                fs.writeFile(htmlPath,htmlString,(err)=>console.log(err))
                if(id==-1){
                    knexBuilder=knex('blog')
                            .insert({
                                title:title,
                                htmlurl:htmlPath
                                //imageurl:newImagePath
                            })
                            .toString();
                }
                else{
                    knexBuilder=knex('blog')
                            .update({
                                title:title,
                                htmlurl:htmlPath
                                //imageurl:newImagePath
                            })
                            .where({id:id})
                            .toString();
                }
                pool.query(knexBuilder+";")
                    .then((result)=>{
                        res.send({"message":"OK"})
                    }).catch((err)=>{throw err})
        })

}

export async function handleShowBlogs(req,res){
    let blog=[];
    let instance;
    let answ=""
    let file
    let title,htmlString
    let retValue=[]
    let queryBuilder=knex('blog').select(`*`).toString();
    pool.query(queryBuilder+";")
        .then((result)=>{
            let urlImages=[]
            
            result.rows.forEach(row=>{
                title=row.title
                let id=row.id
                file= fs.readFileSync(row.htmlurl)
                
                const decoder = new StringDecoder('utf8');
                let htmlString=decoder.write(file).replace("\n","").replace("\r","");
                title=trimString.unTrim(title)
                
                retValue=[...retValue,{htmlString,id,title}]
            })

            
            res.send(retValue)
        }).catch((e)=>console.log(e)) 

                
}

export function handleDeleteBlog(req,res){
    let id=req.params.id
    let title=trimString.fullTrim(req.params.title) ;
    //title.replace(' ','_')
    pool.query(knex('blog').del().where({id:id}).toString()+";")
        .catch(err=>console.log(err))
    fs.rmdir(`src/blogs/${title}`,{recursive:true},
        (err)=>{
            console.log(err)
        })
    res.send({"message":"delete"})
}

export function handleAddOperatorPicture(req,res){
    let formData= new formidable.IncomingForm().parse(req, (err, fields, files) => {
        console.log(files)
        console.log(fields)
        if (err) {
            console.error('Error', err)
        }
        // let id=fields.id;
        let oldPath=files.files.path
        let newPath=`src/profilePictures/${fields.id}.png`;

        fs.renameSync(oldPath,newPath,(err)=>{console.log(err)})
        
        res.send({"message":"OK"});

    })
}

export function handleLoadOperatorPicture(req,res){
    let blog=[];
    let instance;
    let answ=""
    let id =req.params.id
    let queryBuilder=knex('operator').select(`picture`).where({id:id}).toString();
    fs.readFile(`src/profilePictures/${id}.png`,
        (err,data)=>{
            if(err)console.log(err);

            res.send(`profilePictures/${id}.png`); 
        })
}

export function handleBlogImages(req,res){
    try{
        let formData= new formidable.IncomingForm().parse(req, (err, fields, files) => {
            console.log(files)
            if (err)
                throw new Error('bad form-data')
            let imageUrls=[]
            let id=fields.id
            for(let file in files) {
                console.log(file)
                let newPath='src/blogs/'+path.basename(file.File.path)
                fs.rename(file.File.path,newPath,(err)=>{
                    if(err)
                     throw new Error('Nemoguce upisati sliku na server')
                })
                imageUrls.push(process.env.API_URL+newPath)
            }
        })
        pool.query(knex('blog').update({imageUrls:imageUrls}).where({id:id}).toString()+';')
            .catch((err)=>{
                throw new Error('some database error')
            })
        res.send({'urls':imageUrls})
    }
    catch(err){
        res.send({'message':err.msg})
    }

}