"use strict";

const {Request, Response, NextFunction} = require('express');
const Joi = require('joi');
const userService = require('../services/user.service');
const userSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    city: Joi.array().required(),
    ward: Joi.array().required(),
    district: Joi.array().required()

});

class Validation {
    static async user(req,res,next){
        Joi.validate(req.body,userSchema,(errors)=>{
            if(errors){
                res.status(422).json({
                    status:errors
                })
            }else{
                next();
            }
        });
    }
}

module.exports = Validation;