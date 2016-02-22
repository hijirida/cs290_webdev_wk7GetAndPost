/*
This week you will write single page web application that will receive incoming POST and GET requests. If it is a POST request it should say at the top of the page, in an H1 tag "POST Request Received". If a GET request is received it should say "GET Request Received" in the same H1 tag.

Below that you can, at your discretion, create either a list or a table which clearly shows all parameter names and values which were sent in the URL query string for both a GET and POST request (you can still send stuff in the URL when making a POST request).

Below that, if it is a POST request, you should list, again either in a list or a table, all the property names and values that were received in the request body. It should be able to accepter either a well formatted URL encoded query string (x-www-form-urlencoded) or JSON data.
*/


/***************
 * Start Here!
****************/

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set ('port', 3001);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*************
 * This sets up the get request route
 * This is using the basic get route pattern from the lecture notes
 **************/

app.get('/', function(req, res) {
  var param = [];
  for (var p in req.query){
    //console.log("in loop: "+p);
    param.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = params;
  //console.log("context.dataList = "+context.dataList);
  res.render('get-loopback', context);
});

/*************
 * This sets up the post reqeust route
 * This is using the basic post route pattern from the lecture notes
 **************/

app.post('/', function(req, res) {
  
  /* parses the url string for key value pairs */
  var URLparam = [];
  for (var p in req.query){
    //console.log("in loop: "+p);
    URLparam.push({'name':p,'value':req.query[p]})
  }
  //console.log(URLaram1);
  //console.log(req.query);

  var context = {};
  context.dataList = URLparam;
  //console.log("context.dataList = "+context.dataList);
  
  /* parses the http body for key value pairs
     req.body accesses either json objects or URL encoded key value pairs
  */
  var Bodyparam = [];
  for (var p in req.body){
    Bodyparam.push({'name':p,'value':req.body[p]})
  }
  //console.log(Bodyparam);
  //console.log(req.body);
  context.postList = Bodyparam;
  res.render('post-loopback', context);
});

/*************
* NOT PART OF HOMEWORK
* Just testing different routes and functions
**************/
/*
app.get('/show-data',function(req,res){
  console.log("in app.get /show-data");
  //console.log(req);
  var context = {};
  context.sentData = req.query.myData; // this looks for "myData" key name
  //console.log(context);
  console.log(context.sentData);
  res.render('show-data', context);
});

function genContext(){
  var stuffToDisplay = {};
  stuffToDisplay.time = (new Date(Date.now())).toLocaleTimeString('en-US');
  return stuffToDisplay;
}

app.get('/time',function(req,res){
  console.log("in app.get /time");
  res.render('time', genContext());
});

app.get('/get-loopback',function(req,res){
  var qParams = [];
  for (var p in req.query){
    //console.log("in loop: "+p);
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  //console.log("context.dataList = "+context.dataList);
  res.render('get-loopback', context);
});
*/

/*
app.get('/get-loopback-improved',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get-loopback-improved', context);
});
*/

app.listen(app.get('port'), function() {
    console.log('Express handlebars started on http://localhost:'+app.get('port')+
        '; ctrl-c to quit');
});
