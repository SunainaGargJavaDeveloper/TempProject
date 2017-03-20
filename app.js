/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var app=express();
var router = express.Router();
var bodyParser = require('body-parser');

var jobSeekers=require('./models/User');
//set path to the views (template) directory

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname + '/views');
//set path to static files
app.use(express.static(__dirname + '/../public'));
app.use(router);
//handle GET requests on /
app.get('/', function(req, res){res.render('index.jade', {});});
app.get('/PostJob',function(req, res){res.render('CompanyInfo.jade', {});});
//listen on localhost:3000
app.get('/RegisterUser',function(req, res){res.render('RegisterUser.jade', {});});
app.get('/SignIn',function(req, res){res.render('SignIn.jade', {});});
app.post('/register',function(req,res){
   jobSeekers.add(req,res);
});
app.post('/login',function(req,res){
   jobSeekers.login(req,res);
});
app.post('/addCompany',function(req,res){
   jobSeekers.addCompany(req,res);
});
app.listen(3000);

