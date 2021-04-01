import knex from '../config/dbKnex.js'
import pool from '../config/pool.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function addEditQuestionHandler(req,res){
	console.log(req.body.object,"object")
	let {typeprofile,answers,questiontext,connection,checkbox,podtip,id}=req.body.object;
	
	console.log(answers,"answers")
	if(id!=-1){


	pool.query(knex('question').update({
		questiontext:questiontext,
		podtip:podtip,
		typeprofile:typeprofile,
		connection:connection,
		checkbox:checkbox,
		answers:answers
	})
		.where({id:id})
		.toString()+';')
	res.send({"message":"succesfully add question"})
	}
	else{
  	
    		let queryBuilder=knex('question').insert({
  											questiontext:questiontext,
  											typeprofile:typeprofile,
  											connection:connection,
  											answers:answers,
  											checkbox:checkbox,
  											podtip:podtip
  										})
  									.toString();

  			console.log(queryBuilder,"queryBuilder")
  			pool.query(queryBuilder+";")
  				.then((err,result)=>{
  			
  					if(err){
  						console.log (err)
  						//res.send({"message":"not succesfully add question"})
  					}
 
  					res.send({"message":"succesfully add question"})				
  			})
    
  }
}	

export function removeQuestionHandler(req,res){
	let id=req.params.id;
	let query=knex('question').where({id:id}).del().toString()
		
		pool.query(query+";",function(err,result){
			if(err){res.send(err)}
					
			res.send({"message":"succesfully delete question"})
		})
}

export function viewQuestionHandler(req,res){
	let companyQuest=[];
	let operatorQuest=[];
	let query=knex('question').select('*').toString()
	pool.connect((err,client,release)=>{
		if(err){console.log(err)}
		client.query(query+";")
			.then((result)=>{
				release()
				result.rows.forEach(function(row){
					
					if (row.typeprofile=='company') {
						companyQuest.push(row)
					}
					else{
						operatorQuest.push(row);
					}
				});
				res.send({operatorQuest,companyQuest});	 
			}).catch((err)=>res.send({"message":err.message}))
	})
}
	
export function handleRegruterRegistration(req,res){
	try{
	const {username,password,email,name,lastname}=req.body;
	console.log(username,password)
	bcrypt.hash(password,8).then(function(hash){
		pool.connect((err,client,release)=>{
			if(err){console.log(e)}
			let qry=knex('regruter').insert({
				username:username,
				password:hash,
				name:name,
				lastname:lastname,
				email:email
				}).toString()

			client.query(`select * from regruter where username=$1;`,[username])
			.then((result,err)=>{
				if(err){console.log(e)}
				release()
				if(result.rowCount>0){

					return res.send({"message":"username is not available"})
				}
				else{
					client.query(qry+";").then((result)=>{
						return res.send({"message":"OK"})
					})
				}
			});
		})
	})
	}catch(e){
		res.send({"message":"Error"})
	}
}

export function getAllRegrutors(req,res){
	pool.query(knex('regruter').select('*').toString()+';')
		.then((result)=>{
			res.send(result.rows)
		})
		.catch((err)=>{
			console.log(err)
		})
}

export function changeRegruterPassword(req,res){
	const {username,password}=req.body;
    
    pool.query(`select regruter.password from regruter where username=$1;`,
        [username])
        .then((result)=>{
            if(result.rowCount==0)return;
            bcrypt.hash(password,8,(err,hash)=>{
               if(err){res.send(err)}
                let knexBuilder=knex('regruter').update({password:hash})
                                                .where({username:username}).toString();
                pool.query(knexBuilder+";").then(()=>
                    {return res.send({"PASWORD":"CHANGED"})});
                })
        })
        .catch((err)=>{console.log(err)})
}

export function handleDeleteRegruter(req,res){
	let id=req.params.id;
	pool.query(knex('regruter').del().where({id:id}).toString()+";")
		.then((result)=>{res.send(result)})
		.catch((err)=>console.log(err))
}

export function blockRegruter(req,res){
	let id=req.body.id;
	pool.query(
		knex('regruter').update({blocked:true}).where({id:id,blocked:false}).toString()+";"
		)
		.then(res.send({'message':'blocked succesfully'}))
		.catch((err)=>console.log(err))
}

export function unblockRegruter(req,res){
	let id=req.body.id;
	pool.query(
		knex('regruter').update({blocked:false}).where({id:id,blocked:true}).toString()+";"
		)
		.then(res.send({'message':'unblocked succesfully'}))
		.catch((err)=>console.log(err))
}

export function getRegruterAndAdminEmails(req,res){
	pool.query(
		knex('regruter').select('email').toString()+';'
		).then((result)=>res.send(result.rows))
		.catch((err)=>console.log(err))
}

/*export function getProfile(req,res){
	let {id} = req.body;

}*/


