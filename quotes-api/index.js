const express = require('express');
const app = express();
const monk = require('monk');
const bodyParser = require('body-parser');

let textParser = bodyParser.text()

const url = "admin:password1@ds259210.mlab.com:59210/quotes";
const db = monk(url);
const collection = db.get('quotes');

db.then(()=>{
	console.log('Connected to database')
})

//need to add some middleware to set headers on everything
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST,DELETE,GET,PATCH,PUT");
    next();
});

app.use(bodyParser.json())


//handlers
const allQuotes =  async function(req,res){
	//it may be that my req object needs this header not the responce...when deployed that is . we will see 
	res.setHeader('Access-Control-Allow-Origin', '*');
	let quotes =  await collection.find({}).then((docs)=>docs);
	res.send(quotes);
}

const randomQuote = async function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');

	//grab whole collection but just id key-value object, as array
	let ids = await collection.find({}, "_id").then((docs)=> docs)
	//get random id value from that array
	let choice = ids[Math.floor(Math.random()*ids.length)]._id
	
	//get the document that matches that random id
	let randomQuoteToBeSent = await collection.findOne({ _id: choice}).then((doc)=>doc)
	//sent that document back but only the quote.
	res.send(randomQuoteToBeSent.quote)
}

const deleteQuote = async function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');

	let body = await req.body
	console.log("req body: " + body)
	let paramID = body.quote
	console.log("to be deleted from database : " + paramID)

	await collection.findOneAndDelete({quote: paramID}).then((doc)=>{})


	res.send("deleted")

}

const addQuote = async function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');


	
	await collection.insert({quote: req.body});
	res.send("completed")

}

const updateQuote = async function(req,res){
		res.setHeader('Access-Control-Allow-Origin', '*');
		let body = await req.body 
		let searchFor = body.quote
		let updateWith = body.update

		await collection.findOneAndUpdate({quote: searchFor},{quote: updateWith}).then(()=>{})

		res.send('completed')

}

//routes
app.post('/add', textParser, addQuote)
app.patch('/update',textParser, updateQuote)
app.get('/random', randomQuote)
app.delete('/delete/', deleteQuote)
app.get('/*', allQuotes)




app.listen(3006, ()=> console.log("app listening on port 3006"))