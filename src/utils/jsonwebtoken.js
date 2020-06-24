const { verify, sign } = require('jsonwebtoken');
const AppError = require('../components/error');
const config = require('../config');
module.exports.authenticateAccessToken = (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if (accessToken) {
        var token = accessToken.split(' ')[1];
        console.log(token);
        verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                throw new AppError('Forbidden', 403);
            }else{
                req.user = user;
                next();
            }
           
        });
    } else {
        throw new AppError('Unauthorized', 401);
    }
};

module.exports.authenticateRefreshToken = (req, res, next) => {
    const refreshToken = req.headers['authorization'];
    if (refreshToken) {
        var token = refreshToken.split(' ')[1];
        verify(token, config.jwtSecret, (err, data) => {
            if (err) {
                return res.status(403).json({
                    message: 'Forbidden'
                });
            }

            const newAccessToken = sign(
                {
                    username: data.username,
                    password: data.password
                },
                config.jwtSecret,
                {
                    expiresIn: 7200 //trong 30 ngay
                }
            );
            return res.status(200).json({
                'access-token': newAccessToken,
                'fresh-token': refreshToken
            })
        });
    } else {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
}


module.exports.generateToken = (user) => {
    console.log(user);
    const accessToken = sign(user, config.jwtSecret, {
        expiresIn: 7200
        // expiresIn: 30
    })
    const refreshToken = sign(user, config.jwtSecret, {
        expiresIn: 604800
        // expiresIn: 60
    })
    return { accessToken, refreshToken }
}
