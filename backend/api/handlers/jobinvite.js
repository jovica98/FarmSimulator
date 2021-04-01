import knex from '../config/dbKnex.js'
import config from '../config/config.js'
import pool from '../config/pool.js'
import trimString from '../helpers/trimString.js'

const unTrim=trimString.unTrim

export async function handleOperatorsJobInvite(req,res){
    let active_requests=0;
    let id=req.params.id
    let active=[]
    let history=[]
    let invitations=await pool.query(knex('operator').select('invitations').where({id:id}).toString()+';')
    let accepted=await pool.query(knex('operator').select('accepted').where({id:id}).toString()+';')
    let declined=await pool.query(knex('operator').select('declined').where({id:id}).toString()+';')
    invitations=invitations.rows[0].invitations
    console.log(invitations)
    if(invitations==null)
        return
    let is_accept='None'
    if(accepted.rowCount>0){
        accepted=accepted.rows[0].accepted
    }
    else{
        accepted=[]
    }
    if(declined.rowCount>0){
        declined=declined.rows[0].declined
    }
    else{
        declined=[]
    }
    for (let i=0;i<invitations.length;i++){
        let job_invite=await readInvite(invitations[i])
        let today=new Date()
        const {status,...jobInvite}=job_invite
        if(isInArray(invitations[i],accepted))
            is_accept='accept'
        else if(isInArray(invitations[i],declined))
            is_accept='declined'
        if(job_invite.closedate>today){
            active_requests++;
            let status='otvoren'
            jobInvite.closedate=niceDate(jobInvite.closedate)
            jobInvite.opendate=niceDate(jobInvite.opendate)
            //console.log('datumi ',jobInvite.closedate,jobInvite.opendate)
            active.push({jobInvite,is_accept,status})
        }
        else {
            let status='zatvoren'
            jobInvite.closedate=niceDate(jobInvite.closedate)
            jobInvite.opendate=niceDate(jobInvite.opendate)
            history.push({jobInvite,is_accept,status})
        }
    }
    await pool.query(knex('operator').update({active_requests:active_requests}).toString()+';')
    res.send({active,history})
}

async function readInvite(id){
    try{
        let results=await pool.query(knex('jobinvite').select('*').where({id:id}).toString()+';')
        //niceDate(results.rows[0].opendate)
        return results.rows[0]
    }
    catch(err){
        console.log(err)
    }
}

function isInArray(i,array){
    for (let x in array){
        if(x==i){
            return true
        }
    }
    return false
}

export async function handleNewRequest(req, res) {
    const {
        typeoperator,
        requireoperators,
        location,
        closedate,
        companyid,
        answers,
        podtip
    } = req.body
    //console.log('body',req.body)
    //let answers_invite=answers
    let query=knex('jobinvite')
            .insert({
                    typeoperator:typeoperator,
                    requireoperators:requireoperators,
                    location:location,
                    closedate:convertDate(closedate),
                    hired_operators:0,
                    opendate:new Date(),
                    companyid:companyid
            })
            .toString();
    pool.query(query+';')
    .then((result)=>{
        res.send({"message":"Uspesno poslat zahtev"})
    }).catch((err)=>{
        res.send({"message":"Neuspesno poslat zahtev"})
    })
    /*await pool.query(query)
        .then(()=>{
            pool.query(knex('jobinvite').select('id')
                                .where({
                                    typeoperator:typeoperator,
                                    requireoperators:requireoperators,
                                    location:location,
                                    closedate:closedate,
                                    companyid:companyid
                                })
                                .toString()+";")
                .then((result)=>{
                    let id_invite=result.rows[0].id
                    let response=[]
                    //console.log(result.rows[0])
                    for(let i=0;i<answers_invite.length;i++){
                        let questionid=answers_invite[i].questionid;
                        let value=answers_invite[i].value;
                        response.push({questionid,value})
                        let respon={}
                    }
                    pool.query(knex('operator').select('id','answers').toString()+";")
                        .then((result)=>{
                            //console.log(response)
                            console.log(result.rows)
                            
                            for(let i=0;i<result.rowCount;i++){
                                let tmp=[]
                                if(result.rows[i].answers!=null){
                                    let answers=result.rows[i].answers
                                    let length=answers.length
                                    answers=answers.substring(6,answers.length-1).split(')"')
                                
                                    for(let j=0;j<answers.length;j++){
                                        let resp=answers[j].substring(3,answers[j].length).split(',')
                                            if(resp[1]!=undefined){
                                                let value=resp[1].replace('_',' ')
                                                let questionid=resp[0]
                                                tmp.push({questionid,value})
                                            }
                                    }
                                }
                                if(result.rows[i]!=null){
                                    let id=result.rows[i].id
                                    let operator={"answers":tmp,"id":id}
                                    let jobinvite={"answers":response,id:id_invite}
                                    console.log(operator,jobinvite)
                                    handleAddInvite(operator,jobinvite)
                                }    
                            }                            
                            res.send({"message":"OK"})
                        })
                    })
                })
            .catch((err)=>{
                console.log(err)
                res.send({"message":"BAD"})
            })*/
}

export function handleShowActiveRequest(req,res){
    updateStatus(req.params.id);
    let response=[]
    let queryBuilder=knex('jobinvite')
                        .select('requireoperators','location','hired_operators','opendate','closedate','status','typeoperator')
                        .where({companyid:req.params.id}).toString();
    
    pool.query(queryBuilder+";")
        .then((result)=>{
            //niceDate(result.rows[0].opendate)
            
            for(let i=0;i<result.rowCount;i++){
                if(result.rows[i].closedate>new Date()){
                    result.rows[i].opendate=niceDate(result.rows[i].opendate)
                    result.rows[i].closedate=niceDate(result.rows[i].closedate)
                    response.push(result.rows[i])
                }                
            }
            res.send(response)
        }).catch(e=>console.log(e))

}

export function handleShowHistoryRequest(req,res){
    let response=[]
    updateStatus(req.params.id);
    let queryBuilder=knex('jobinvite')
                        .select('requireoperators','location','hired_operators','opendate','closedate','status','typeoperator')
                        .where({companyid:req.params.id}).toString();
    
    pool.query(queryBuilder+";")
        .then((result)=>{
            for(let i=0;i<result.rowCount;i++){
                if(!(result.rows[i].closedate>new Date())){
                    result.rows[i].status='zatvoren'
                    result.rows[i].opendate=niceDate(result.rows[i].opendate)
                    result.rows[i].closedate=niceDate(result.rows[i].closedate)
                    response.push(result.rows[i])
                }
            }
            res.send(response)
        }).catch(e=>console.log(e))
}

export async function updateStatus(id){
    try{
        let job_invite=await readInvite(id)
        let today=new Date()
        if(job_invite.closedate>today){
            console.log('closedate',job_invite.closedate>today)
            await pool.query(knex('jobinvite').update({status:'zatvoren'}).where({id:id}).toString()+';')
        }
    }
    catch(err){
        console.log(err)
    }
}

export function onAccept(req,res){
    let idOperator=req.body.idOperator;
    let idInvite=req.body.idInvite;
    pool.query(`update operator set accepted=array_append(accepted,$1),accept_requests=accept_requests+1
         where operator.id=$2;`
        ,[idInvite,idOperator])
    .then((result,err)=>{
        if(err){console.log(err);res.send({"message":"BAD"})}
        else {
            res.send({"message":"OK"})
        }
    })
}

export function onDecline(req,res){
    let idOperator=req.body.idOperator;
    let idInvite=req.body.idInvite;
    pool.query(`update operator set declined=array_append(declined,$1),decline_requests=decline_requests+1
         where operator.id=$2;`
        ,[idInvite,idOperator])
    .then((result,err)=>{
        if(err){console.log(err);res.send({"message":"BAD"})}
        else {
            res.send({"message":"OK"})
        }
    })
}

export async function sendJobInviteToOperator(req,res){
    let {operator_id,jobinvite_id} = req.body;
    pool.query(`update operator set invitations=array_append(invitations,$1),
                                                    active_requests=active_requests+1 where id=$2;`
                                                    ,[jobinvite_id,operator_id])
                        .then((result)=> {res.send({"message":"OK"})})
                        .catch((err)=>console.log(err))
}

export function showCompanyJobInvite(req,res){
    let {id}=req.params;
    pool.query(knex('jobinvite').select('*').where({companyid:id}).toString()+';')
    .then((result)=>{
        res.send(result.rows)
    })
    .catch((err)=>{
        res.send({"message":"Problem sa dohvatanjem kompanijinih poziva za posao"})
    })
}

export function handleJobInviteSearch(req,res){
    try{
        //select * from operator where lower(${filter}) Like lower('%${filterValue}%');
        let {filter,filterValue} = req.params;
        pool.query(`select * from jobinvite where lower(${filter}) Like lower('%${filterValue}%');`)
        .then((results)=>{
            res.send(results.rows);
        }).catch((err)=>{
            throw err
        })
        
    }
    catch(e){
        console.log(e)
    }
}

function niceDate(date){
    date=date+''
    
    date=date.substring(4,15)
    //date=Array.from(date)
    //console.log(date)
    let year=date.substring(7,11)
    let month=date.substring(0,3)
    let day=date.substring(4,6)
    date=day+'.'+month+'.'+year+'.'
    //console.log(date,'date2')
    return date
}

function convertDate(date){
    let array=Array.from(date);
    let tmp=[]
    tmp[0]=array[0]
    tmp[1]=array[1]
    array[0]=array[3]
    array[1]=array[4]
    array[3]=tmp[0]
    array[4]=tmp[1]
    date =array.join('')
    return date
}

function matchInvite(operator,jobinvite){
    let countMatching=0;
    let invite_id=jobinvite.id
    let invite_answers=jobinvite.answers
    let operator_id=operator.id
    let operator_answers=operator.answers
    let knexBuilder=knex('question').select('id','connection')
                        .where('connection','>',0)
                        .toString();

    pool.query(knexBuilder+";")
        .then((result)=>{
            for(let i=0;i<result.rowCount;i++){
                for(let j=0;j<invite_answers.length;j++){
                    if(result.rows[i].connection==invite_answers[j].questionid){
                        for (let k=0;k<operator_answers.length; k++) {
                                if(result.rows[i].id==operator_answers[k].questionid && 
                                    result.rows[i].connection==invite_answers[j].questionid){
                                    if(operator_answers[k].value==invite_answers[j].value){
                                        countMatching++;
                                    }
                                }
                        }
                    }
                }
            }
            
            if(countMatching==invite_answers.length){
                console.log('Pogodjeni')
                /*pool.query(`update operator set invitations=array_append(invitations,$1),
                                                    active_requests=active_requests+1 where id=$2;`
                                                    ,[invite_id,operator_id])
                        .then((result)=> console.log("OK"))
                        .catch((err)=>console.log(err))
                pool.query(knex(''))*/
            }
         })
        .catch((e)=>{console.log(e)})
}

export async function handleMatchInvite(req,res){
try{
    let {id}=req.params;
    let response=[]
    let jobinvite_answers=[]
    let jobinvite_result=await pool.query(knex('answers').select('*').where({role_id:id,role:'jobinvite'}).toString()+';')
    //console.log('jobinvite_result',jobinvite_result)
    let jobinvite={}
    let connection=[]
    for(let i=0;i<jobinvite_result.rowCount;i++){
            jobinvite.answers=jobinvite_result.rows[i].answer;
            jobinvite.id=jobinvite_result.rows[i].role_id
            jobinvite.questionid=jobinvite_result.rows[i].question_id;
            jobinvite_answers.push(jobinvite)
    }
    //let jobinvite_id=
    //let operator_question=pool.query(knex('question').select('*').where({connection:}))
            
            
    //console.log('jobinvite_answers ',jobinvite_answers)
    let operators= await pool.query(knex('operator').select('*').where({status:"active"}).toString()+';')
    for(let i=0;i<operators.rowCount;i++){
        let operator={}
        let countMatching=0;
        let operator_id=operator.id=operators.rows[i].id;
        let operator_result=await pool.query(knex('answers').select('*')
            .where({role_id:operator_id,role:'operator'}).toString()+';')
        for(let j=0;j<operator_result.rowCount;j++){

            let question_id=operator_result.rows[j].question_id;
            let question_operator=await pool.query(
                knex('question').select('*').where({id:question_id}).toString()+';')
            console.log('operator_result.rows',operator_result.rows[j])
            let found=jobinvite_answers.find(jobinvite => jobinvite.questionid==question_operator.rows[0].connection)
            console.log('found ',found)
            if(found!=undefined && found.answers==operator_result.rows[j].answer){
                countMatching++
            }
        }
        if(countMatching==jobinvite_answers.length){
            response.push(operators.rows[i])
        }


    }
    res.send(response)
}
    catch(err){console.log(err)}
}

export function handleAddInvite(){}