let tokenizer = require('jsonwebtoken');
let response = require('../utils/response');

module.exports = {
    createToken: (data) => {
        return tokenizer.sign(data, process.env.TOKEN_KEY, {
            expiresIn: `${process.env.TOKEN_EXPIRE}`
        });
    },
    auth: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(' ')[1];
            tokenizer.verify(token, process.env.TOKEN_KEY, (err, auth) => {
                if (err) {
                    response.unAuthorized(res);
                } else {
                    req.token = auth;
                    next();
                }
            });
        } else {
            response.unAuthorized(res);
        }
    }
};
