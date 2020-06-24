"use strict";
const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
var AppError = require('../components/error');
var {generateToken} = require('../utils/jsonwebtoken')
module.exports = {
    User:async (req,res,next)=>{
        const value = await userService.readUser(req.body.username);
        if(value === null){
            next();
        }else{
            res.json({message: "Exist value"});
            const err = new AppError("invalid is Exist",422);
        }
    },
    account: async(req,res,next)=>{
        var user = await userService.readUser(req.body.username);
        if(user === null){
            const userErr = new AppError('Account not fond',404);
            next(userErr);
        }
        if(user !== null){
            bcrypt.compare(req.body.password,user.password,(errors, result)=>{
                if(errors){
                    const newErr = new AppError('Can not compare password',422);
                    next(newErr);
                }else if(result){
                    //json web token
                    const {accessToken, refreshToken} = generateToken({
                        username: user.username,
                        password: user.password
                    });

                    return res.status(200).json({
                        message:'Login successfully',
                        'access-token':accessToken,
                        'refresh-token':refreshToken
                    })
                }else{
                    const newErr = new AppError('Invalid password',422);
                    next(newErr);
                }
            })
        }
    }
}