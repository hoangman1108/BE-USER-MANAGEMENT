"use strict";
const bcrypt = require('bcrypt');

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
    }
}