let joi = require('joi');

exports.login = joi.object().keys({
    emailId: joi.string().required(),
    password: joi.string().required()
});
