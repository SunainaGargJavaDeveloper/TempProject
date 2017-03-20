/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 
 */
//var UserSchema = require('./mydb');
var mongoose = require('mongoose');

var uri = 'mongodb://localhost/FinalJobBoard';
var mongoose =
        mongoose.connect(uri);
mongoose.Promise = global.Promise;
var connection = mongoose.connection;
console.log('connection::connecting...');
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;
var UserSchema = new Schema({
firstName: String,
lastName: String,
email: String,
password: String
});
//var Users=mongoose.model('Users', UserSchema);
var JobSeekers = mongoose.model('JobSeekers', UserSchema);
var Schema=mongoose.Schema;
var CompanySchema=new Schema({
    companyName: String,
    companyCountry: String,
    companyAddress:String,
    companySummary:String
}); 
var CompanyInfo = mongoose.model('companies', CompanySchema);
var usersProjection = { 
    __v: false,
    _id: false,
    firstNme:false,
    lastname:false
};
module.exports = {
    add: function (req,res) {
        var personInfo = req.body; 
        var newPerson = new JobSeekers({
            firstName: personInfo.firstName,
            lastName: personInfo.lastName,
            email: personInfo.eMail,
            password: personInfo.passwd
        });
        console.log(newPerson.firstName + " " + newPerson.lastName + " " + newPerson.email + " " + newPerson.password);
        newPerson.save(function (err, newPerson, isSaveSuccessful) {
            if (err)
                //res.status(400).send({
                 //   message: 'User is invalid' });
                     res.render('messageUser.jade', {message: "Database error", type: "error"});
               
            
            //return res.json(newPerson);
             else
                res.render('messageUser.jade', {message:"Sign Up successful", type:"success", person:personInfo});
        }); },
    login:function(req,res){
        var person=req.body;
        console.log(person.eMail+" "+person.passwd);
        JobSeekers.findOne({ 'email': person.eMail,"password":person.passwd }, 'email password' ,function (err, docs) {if (err) 
                     res.render('messageSignIn.jade', {message: "Database error"});
                   var msg;
                   if(docs==null)
                       msg="Either User Name or Password is null";
                   else
                       msg="You are authorised";
                   res.render('messageSignIn.jade', {message: msg });
        });
           
    },  
    addCompany:function(req,res){
       var companyInfo = req.body; 
        var newCompany = new CompanyInfo({
            companyName: companyInfo.companyName,
            companyCountry: companyInfo.companyCountry,
            companyAddress: companyInfo.companyAddress,
            companySummary: companyInfo.companySummary
        });
       // console.log(newPerson.firstName + " " + newPerson.lastName + " " + newPerson.email + " " + newPerson.password);
        newCompany.save(function (err,newCompany) {
            if (err)
                //res.status(400).send({
                 //   message: 'User is invalid' });
                     res.render('messageCompany.jade', {message: "Database error", type: "error"});
               
            
            //return res.json(newPerson);
             else
                res.render('messageCompany.jade', {message:"Sign Up successful", type:"success", company:companyInfo});

        }); 
    }
    
};