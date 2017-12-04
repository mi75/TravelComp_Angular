var http = require('http');
var fs = require('fs');
var qs = require('querystring');

//create a server object:
http.createServer(function (req, res) {
var headers = {'Test-Header': 'Test'};

  try {
	console.log(req.method);
	console.log(req.url);

  	if (req.method == 'GET'){
 		processGetRequest(req, res);
  	} else {
  		if (req.method == 'POST') {
  			var body = '';
  			var postData;

  			req.on('data', function (data) {
            	body += data;
    		});

    		req.on('end', function () {
            	postData = qs.parse(body);
  			
	  			if (req.url == '/api/contacts') {
	  				console.log(postData);

	  				res.writeHead(301,
					  {Location: '/contacts'}
					);
					res.end();
	  			}
        	});

  		}
  	}

  }

  catch (err){
  	res.writeHead(501, headers);
  	res.write('Exception occured');
  	res.end();
  	throw err;
  }

}).listen(8080);

function processGetRequest(req, res){

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
	  		case '/favicon.ico': {
				targetFileName = __dirname + '/img/t.png';
				break;
	  		}
	  		default :{
	  			targetFileName = __dirname + req.url;
	  		}
	}
	  		
	if (fs.existsSync(targetFileName)) {
	  	fs.readFile(targetFileName, function(err, data) {
	    	res.writeHead(200, {});
	    	res.write(data);
	    	res.end();
		});
	}
	else {
		res.writeHead(404);
		res.write('Not found');
		res.end();
	}
}