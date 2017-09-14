var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user:'umangokate',
    database:'umangokate',
    host:'http://db.imad.hasura-app.io',
    port:5432,
    password:process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));

/*var articles = {
	'article-one':{
		title:'Article One',
		heading:'Article One',
		date:'12/6/17',
		content:'<p>My first article<p>'
	}

};


function createTemplate(data)
{
	var title = data.title;
	//console.log(title);
	var heading = data.heading;
	var date = data.date;
	var content = data.content;

	var htmlTemplate =
	`<html>
		<head>
			<title>${title}</title>
			<link href="/ui/style.css" rel="stylesheet" />
		</head>
		<body>
			<div id="container">
				<div>
					<h3>${heading}</h3>
				</div>
				<hr>
				<div>
					${date}
				</div>
				<hr>
				<div>
					${content}
				</div>
				<hr>
			<div>
		</body>
	</html>`;

	return htmlTemplate;
}*/
var pool = new Pool(config);

app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
       if(err){
        res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result));
       }
    });
});

var counter = 0;
app.get('/ui/main.js',function(req, res){
	res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/counter',function(req,res){
	counter = counter+1;

	res.send(counter.toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

/*app.get('/:articleName', function(req,res){
	var articleName = req.params.articleName;
	res.send(createTemplate(articles[articleName]));
});*/

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names = [];
app.get('/submit-name',function(req,res){
	var name = req.query.name;
	names.push(name);
	res.send(JSON.stringify(names));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
