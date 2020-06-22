"use strict";
const express = require('express');
const bodyParser = require('body-parser');

var mongo = require('connect-mongo');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

var session = require('express-session');



const app = express();


const routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',routes);
module.exports = app;