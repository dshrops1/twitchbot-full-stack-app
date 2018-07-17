const express = require('express')
const monk = require('monk')
const bodyParser = require('body-parser')
const app = express()
import login from "./envior"

const url = login
const db = monk(url)

db.then(()=>{
	console.log('Connected correctly to server')
})

const collection = db.get('users')



//middle ware to set cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST");
    next();
});

app.use(bodyParser.json())

/* 
* this api will be used as  userth authentication so we will post and take out the req body (will need to download proper thing for that)
* then we will use our grapAuth function to get from data base and if it matchs the body correctly we will respond with access.
 */

//getting and setting user from data base
 async function grabAuth(req,res){

 	let body =  await req.body 
 	let bodyUser = body.user
 	let bodyPass = body.password
	let toSendBack = await collection.findOne({user: bodyUser}).then((doc)=>doc)
	console.log(req.body)
	console.log(toSendBack)

	console.log(bodyPass)
	if(toSendBack.password == bodyPass){
		res.send("true")
	}else{

		res.send('false')
	}

}


app.post('/', grabAuth)
//443
app.listen(3007, ()=> console.log('running on port 3007'))