import pool from '../config/pool.js'
import trimString from '../helpers/trimString.js'
import knex from '../config/dbKnex.js'

let operatorProperties={}
operatorProperties.addEducation=(req,res)=>{
    try{
    //console.log('body',req.body)
    let array= req.body;
    let operator_id=array[0].operator_id;
    pool.query(
        ` delete from education where operator_id =$1;`,[operator_id]
    ).then((result)=>{
        for(let i=0;i<array.length;i++){
         console.log(array[i],`${array[i]}`)
    let {operator_id,duration,smer,level,school,location}=array[i];
    
    pool.query(
        knex('education').insert(
            {
                operator_id:operator_id,
                duration:duration,
                school:school,
                level:level,
                smer:smer,
                location:location
            }).toString()+';'
        ).then((result)=>{console.log(result);})
        .catch((err)=>{console.log(err);throw err;})
    }
        console.log(result)}).catch((err)=>{console.log(err);throw err})
    
    
    res.send({'message':' dodato obrazovanje'})
    }catch(err){res.send({'message':'nije dodato obrazovanje'})}
}

operatorProperties.addExperience=(req,res)=>{
     try{
    //console.log('body',req.body)
    let array= req.body;
    let operator_id=array[0].operator_id;
    pool.query(
        ` delete from experience where operator_id =$1;`,[operator_id]
    ).then((result)=>{
for(let i=0;i<array.length;i++){
    console.log(array[i],`array[${i}]`)
    let {operator_id,duration,firm,location,position,hired,country,abroad,description}=array[i];
    
    pool.query(
        knex('experience').insert(
            {
                operator_id:operator_id,
                duration:duration,
                firm:firm,
                location:location,
                position:position,
                hired:hired,
                abroad:abroad,
                country:country,
                description:description
            }).toString()+';'
        ).then((result)=>{console.log(result);})
        .catch((err)=>{console.log(err);throw err;})
    }
        console.log(result)}).catch((err)=>{console.log(err);throw err})
    
    
    res.send({'message':' dodato iskustvo'})
    }catch(err){res.send({'message':'nije dodato iskustvo'})}
}

operatorProperties.addSkill=(req,res)=>{
    let skill=req.body.skill;
    skill=trimString.trimArray(skill)
    const id=req.body.id;
    pool.query(
        knex('operator').update({skill:skill}).where({id:id}).toString()+';'
        ).then(res.send({'message':'dodate su vestine'}))
        .catch((err)=>res.send({'message':'nisu dodate vestine'}))
}

operatorProperties.showSkill=(req,res)=>{
    const id=req.params.id;
    pool.query(
        knex('operator').select('skill').where({id:id}).toString()+';'
        )
        .then((result)=>{
            let skill=result.rows[0].skill
            res.send(trimString.unTrimArray(skill))
        }) 
        .catch((err)=>res.send({'message':'nisu dodate vestine'}))
}
    
operatorProperties.showEducation=(req,res)=>{
    const id=req.params.id;
    pool.query(
        knex('education').select('*').where({operator_id:id}).toString()+';'
        )
        .then((result)=>{
            res.send(result.rows)
        }) 
        .catch((err)=>{console.log(err);res.send({'message':'nije dodato obrazovanje'})})
}

operatorProperties.showExperience=(req,res)=>{
    const id=req.params.id;
    pool.query(
        knex('experience').select('*').where({operator_id:id}).toString()+';'
        )
        .then((result)=>{
            res.send(result.rows)
        }) 
        .catch((err)=>res.send({'message':'nije dodato iskustvo'}))
}

operatorProperties.changeOperatorProperty=(req,res)=>{
    const{id,property,value}=req.body
    pool.query(
        `update operator set ${property} = $1 where id=$2 ;`,[value,id]
        ).then(()=>res.send({"message":`uspesno promenjena ${property}`}))
        .catch((err)=>res.send({"message":"neuspesna promena"}))
}

operatorProperties.deleteEducation=(req,res)=>{
    let {operator_id,duration,level,school,location,smer}=req.body;
    pool.query(
        knex('education').del().where(
            {
                operator_id:operator_id,
                duration:duration,
                school:school,
                level:level,
                smer:smer,
                location:location
            }).toString()+';'
        ).then(res.send({'message':'obrisano je obrazovanje'}))
        .catch((err)=>res.send({'message':'nije obrisano obrazovanje'}))
}

operatorProperties.deleteExperience=(req,res)=>{
    let {operator_id,duration,firm,location,position,hired,abroad,country,description}=req.body;
    pool.query(
        knex('experience').del().where(
            {
                operator_id:operator_id,
                duration:duration,
                firm:firm,
                location:location,
                position:position,
                hired:hired,
                abroad:abroad,
                country:country,
                description:description
            }).toString()+';'
        ).then(res.send({'message':'obrisano je iskustvo'}))
        .catch((err)=>res.send({'message':'nije obrisano iskustvo'}))
}


operatorProperties.editMark=(req,res)=>{
    let {mark,id}=req.body;
    pool.query(knex('operator').update({mark:mark}).where({id:id}).toString()+';')
    .then(res.send({"message":"uspesno dodata ocena"}))
    .catch((err)=>{res.send({"message":"neuspesno dodata ocena"})})
}

export default operatorProperties