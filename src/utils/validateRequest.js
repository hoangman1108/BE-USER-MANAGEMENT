"use strict";

const {Request, Response, NextFunction} = require('express');
const Joi = require('joi');
const userService = require('../services/user.service');
const userSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    name: Joi.string().required(),
    phone: Joi.string().required()
});

class Validation {
    static async user(req,res,next){
        var temp = await userService.readUser(req.body.username);
        console.log(temp)
        if(temp){
            console.log("Exit")
            res.status(403).json({
                message:"username is exists"
            })
        }
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