var express = require('express');
var app = express();
var hbs = require('hbs');
var https = require('https');

/*set template engfine*/
app.set('view engine', 'html')
app.engine('html', hbs.__express);

/*Assets*/
app.use(express.static('public'));

/*Routes*/

app.get('/',function(req,res){
res.render('index');
});

app.get('/search', function(req, res){
    var endPointSpotify = "https://api.spotify.com/v1/search"+"?q="+req.query.q+"&type=track&limit=10";
    var buffer = "";
    
    https.get(endPointSpotify, function(response) {
    response.on('data', function(d) {
      buffer += d;
    });
    
    response.on("end", function (errorS) {
    	
      res.render('index', {items: JSON.parse(buffer).tracks.items});
    });
});
});

app.listen(3000,function(){
console.log('Node Server Running');
});
