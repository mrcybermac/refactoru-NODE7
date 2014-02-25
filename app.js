
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

//

var app = express();


// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//routes
//renders the index page
app.get('/', function(req, res){
	res.render('index')
});

// displays a list of applicants
app.get('/applicants', function(req, res){

    ApplicantModel.find({}, function (err, docs) {
        res.render('applicants', {applicants: docs});
    });

});

// creates and applicant
app.post('/applicant', function(req, res){
    console.log(req.body);
    var applicant = new ApplicantModel(req.body);
    applicant.save();
	// Here is where you need to get the data
	// from the post body and store it
    res.redirect('/appsuccess');
});
app.get('/applicant/remove/:id', function(req, res){
    ApplicantModel.remove({_id:req.params.id}, function (err, doc)  {
        //doc[0].remove(function (err, doc){
            res.redirect('/applicants');
        //});
    });

});
app.get('/appsuccess', function(req, res){
    res.render('success');
});


// Connect to DB:
mongoose.connect('mongodb://localhost/omega3studios');

// Setup Model/Schema:

var ApplicantModel = mongoose.model('applicant', {
    name: String ,
    bio: String,
    skills: String,
    years: Number,
    why: String
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
