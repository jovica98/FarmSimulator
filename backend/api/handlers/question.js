import knex from '../config/dbKnex.js'
import pool from '../config/pool.js'
import trimString from '../helpers/trimString.js'

const fullTrim=trimString.fullTrim

export async function handleAnswerOnQuestion(req,res){
    let {id,questionid,profiletype,answer}=req.body;
    try{
    //console.log("from handleAnswerOnQuestion line 7",id,questionid,profiletype,answer)
    let i;
    let queryBuilder;
    let table
    let res_query
    if(profiletype=='company'){
       // res_query=await pool.query('select max(id) from jobinvite whe;')
        table='jobinvite'}
    else {
        table='operator'
    }    
    
    await pool.query(knex('answers').del().where({role_id:id,question_id:questionid}).toString()+';')
    .then((result)=>{console.log(result)}).catch((err)=>{throw err})
    await pool.query(knex('answers').insert(
        {role_id:id,
        question_id:questionid,
        role:table,
        answer:answer,
        profiletype:profiletype
        }).toString()+';')
    .then((result)=>{console.log(result)}).catch((err)=>{throw err})
    res.send({id,questionid,answer})  	
    }
    catch(err){
        console.log(err)
    }
}

export function readOperatorPersonalQuestions(req,res){
    let queryBuilder=knex('question').select('*')
                                    .where({typeprofile:'operatorpersonal'}).toString();
    pool.query(queryBuilder+";")
        .then((result)=>{
            res.send(result.rows)
        }).catch((e)=>console.log(e))
}

export function readOperatorPreferencesQuestions(req,res){
    let queryBuilder=knex('question').select('*')
                                    .where({typeprofile:'operatorpreferences'}).toString();
    pool.query(queryBuilder+";")
        .then((result)=>{
            res.send(result.rows)
        }).catch((e)=>console.log(e))
}

export function readOperatorSkillQuestions(req,res){
    let queryBuilder=knex('question').select('*')
                                    .where({typeprofile:'operator-skill'}).toString();
    pool.query(queryBuilder+";")
        .then((result)=>{
            res.send(result.rows)
        }).catch((e)=>console.log(e))
}


export function readCompanyQuestions(req,res){
    let queryBuilder=knex('question').select('*')
                                    .where({typeprofile:'company'}).toString();
    pool.query(queryBuilder+";")
        .then((result)=>{
            res.send(result.rows)
        }).catch((e)=>console.log(e))   
}

export function showAllAnswers(req,res){
    pool.query(knex('operator').select('answers').toString()+";")
        .then((result)=>{
            res.send(result.rows)
        })
}

export function answerOnCompanyQuestion(id,answers){
    pool.query(
        knex('jobinvite').update({answers:answers}).where({id:id}).toString()+";"
    )
    .catch((err)=>console.log(err))
}

export async function showCompanyQuestionClientSide(req,res){
try{
    let array = req.body;
    let response = []
    let poolNull = await pool.query(knex('question').select('*').whereNull('podtip').andWhere({typeprofile:'company'}).toString()+';')
    console.log()
    response.push(poolNull.rows)
    let len=array.length;
    for(let i=0;i<len;i++){
        let localPool= await pool.query(knex('question').select('*').where({podtip:array[i],typeprofile:'company'}).toString()+';')
        console.log(localPool.rows)
        response.push(localPool.rows)
    }
    res.send(response);
}
catch(err){
    console.log(err)
    res.send([])
}
}