var exp=require('express');
var app=exp();
var path=require('path');

var CodeChecker=require('./request.js');



app.use(exp.static(path.join(__dirname, 'public')));

app.post('/check',function(req,res){
	// console.log(req.body);
	// res.setHeader('Access-Control-Allow-Origin: *');
	console.log(req.query);
	var codeChecker=new CodeChecker();
	codeChecker.check(req.query,function(err,result){
		if(err){
			res.end("error"+err);
		}else{
			res.end(JSON.stringify({'message' : result.result.message,'result' : result.result.stdout, 'compilemessage':result.result.compilemessage}));
			console.log(result);
		}
	});
  	//res.end('hello');
})

app.listen(process.env.PORT || 3000,function(){
	console.log("Node app is running at localhost:" + process.env.PORT || 3000);
});
