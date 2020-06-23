"use strict";
const express = require('express');
const bodyParser = require('body-parser');

var mongo = require('connect-mongo');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

var cookieParser =require('cookie-parser');
var session = require('express-session');
require('dotenv').config();

var MongoStore = mongo(session);
const app = express();
const mongoUrl = process.env.DATA;
mongoose.Promise = bluebird;
mongoose.connect(mongoUrl,{useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true}).then(
    ()=>{
        console.log("connect success");
    }
).catch(err=>{
    console.log("mongoDB connection error. Please make sure MongoDB is running. "+err);
    //process.exit();
})


const routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('secret'));
app.use(session());

app.use(session({
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: mongoUrl,
        secret: process.env["SESSION_SECRET"],
        autoReconnect: true
    })
}))

app.use('/',routes);
module.exports = app;