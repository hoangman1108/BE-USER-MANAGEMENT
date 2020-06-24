"use strict";
var mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    city_code: String,
    district_code: String,
    ward_code: String,
    city:String,
    district: String,
    ward: String,
},{_id: false});

const UserSchema = new mongoose.Schema({
    username:String,
    password: String,
    name: String,
    phone: String,
    location: LocationSchema
},{collection:'user'});

var User = mongoose.connection.useDb('hoangman').model('User',UserSchema);

module.exports.User = User;