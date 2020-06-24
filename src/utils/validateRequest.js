"use strict";

const Joi = require('joi');

const AppError = require('../components/error');

const userSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    city: Joi.array().required(),
    ward: Joi.array().required(),
    district: Joi.array().required()

});

const accountSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
});

class Validation {
    static async user(req,res,next){
        Joi.validate(req.body,userSchema,(errors)=>{
            if(errors){
                const err = new AppError("Invalid request data",422);
                next(err);
            }else{
                next();
            }
        });
    }

    static async account(req,res,next){
        Joi.validate(req.body,accountSchema,(errors)=>{
            if(errors){
                const err = new AppError("Invalid request data",422);
                next(err);
            }else{
                next();
            }
        })
    }
}

module.exports = Validation;