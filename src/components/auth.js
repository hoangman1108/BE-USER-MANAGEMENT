"use strict";
const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
var {AppError} = require('../components/error');
module.exports = {
    hashPassword: async (password) => {

        const saltRounds = 10;
        const hashedPassword = await new Promise(function(resolve, reject){
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err)
                resolve(hash);
            });
        })
        return hashedPassword;
    },
    User:async (req,res,next)=>{
        const value = await userService.readUser(req.body.username);
        if(value === null){
            next();
        }else{
            res.json({message: "Exit value"})
        }

    }
}