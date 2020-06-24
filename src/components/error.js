"use strict";
const express = require('express');
class AppError extends Error{
    statusCode;
    status;

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

function errorHandler(err,req,res){
    if(!err){
        err = new AppError('Undefined',500);
    }
    res.status(err.statusCode).json(err);
}

module.exports.AppError = AppError;
module.exports.errorHandler = errorHandler;