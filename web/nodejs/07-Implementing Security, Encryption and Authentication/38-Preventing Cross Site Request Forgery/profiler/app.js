
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
    , fs = require('fs');

var opts = {key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')};

var app = module.exports = express.createServer(opts);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  

  
  app.use(require('stylus').middleware({
    src: __dirname + '/views',
    dest: __dirname + '/public'
  }));
  
  app.use(express.favicon());
  
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  
  app.use('/admin', require('./login/app'));
  

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


// Routes

app.get('/:pagenum([0-9]+)?', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
