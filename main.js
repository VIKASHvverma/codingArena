var exp=require('express');
var app=exp();
var path=require('path');

var CodeChecker=require('./request.js');



app.use(exp.static(path.join(__dirname, 'public')));

app.get('/check',function(req,res){
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

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',function(){
	console.log('%s: Node server started on %s:%d !',
                        Date(Date.now() ), process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', process.env.OPENSHIFT_NODEJS_PORT || 8080);
});
