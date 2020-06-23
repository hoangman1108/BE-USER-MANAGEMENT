"use strict";
var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:String,
    password: String,
    name: String,
    phone: String
},{collection:'user'});

var User = mongoose.connection.useDb('hoangman').model('User',UserSchema);

module.exports.User = User;