const exec = require('child_process').exec;
const spawn = require('child_process').spawn	
const fork = require('child_process').fork

//let twitchBot = fork('./twitchbot-api/index.js')

//starts up a child exec process for my quotes database
let quoteDataBase = exec('node ./quotes-api/index.js', 
	function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if(error !== null){
			console.log('exec error: ' + error);
		}


})

let twitchBot = spawn('node ./twitchbot-api/index.js',{
  stdio: 'inherit',
   shell: true,
   detached: true,
})

//whatever the child exec process quoteDatabase pushs to the standard out (console) displays on the parent process 
// aka the terminal I run apiStart from
quoteDataBase.stdout.on('data', (data) => {
  console.log(`quoteDataBase stdout:\n${data}`);
});

//whenver I recieve an error from quoteDataBase it also displays in the parent process
quoteDataBase.stderr.on('data', (data) => {
  console.error(`quoteDataBase  stderr:\n${data}`);
});


//starts up a child process for my user Authentication 
let AuthenDataBase = exec('node ./authen-api/index.js', 
	function(error, stdout, stderr){
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if(error !== null){
			console.log('exec error: ' + error);
		}


})
