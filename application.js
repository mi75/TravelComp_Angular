var http = require('http');
var fs = require('fs');

//create a server object:
http.createServer(function (req, res) {
var headers = {'Test-Header': 'Test'};

  try {

  	var targetFileName;

  	switch(req.url){
  		case '/': {
			targetFileName = __dirname + '/index.html';
			break;
  		}
  		case '/contacts': {
			targetFileName = __dirname + '/contact_page.html';
			break;
  		}
  		default :{
  			targetFileName = __dirname + req.url;
  		}
  	}
  	

	fs.readFile(targetFileName, function(err, data) {
	    res.writeHead(200, headers);
	    res.write(data);
	    res.end();
  	});


  }

  catch (err){
  	res.writeHead(501, headers);
  	res.write('Exception occured')
  	res.end();
  }


}).listen(8080);