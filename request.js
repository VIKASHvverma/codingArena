//Load the request module
 var request = require('request');
// var fs=require('fs');
// fs.readFile('main.java',function(err,data){
//   //console.log(data.toString());
//   source=data.toString();

// });
//Lets configure and request

var CodeChecker=function(){};
CodeChecker.prototype.check=function(data,callback){
  request({
    url: 'http://api.hackerrank.com/checker/submission.json', //URL to hit
    form: {source: data.source, lang:data.lang,testcases:"[\"Test 1\"]", api_key: "hackerrank|82087-178|4d484461df76fe95ae2b909ac4cdf5e983facaad"}, //Query string data
    method: 'POST'
  }, function(error, response, body){
    if(error) {
      console.log(error);
      callback(error,null);
    } else {
      callback(null,JSON.parse(body));
    }
  });
}

module.exports=CodeChecker;
