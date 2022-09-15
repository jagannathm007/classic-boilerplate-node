let response = require('../../utils/response');
let models = require('./../../db/zindex');
let validator = require('./../../validators/zindex');

exports.login = async (req, res) => {
    try {
        let request = await validator.users.login.validateAsync(req.body);
        let user = await models.users.findOne({ emailId: request.emailId });
        if (user != null) {
            if (user.isPasswordMatch(request.password)) {
                user = user.toJSON();
                delete user.password;
                response.success('User loggedIn successfully!', user, res);
            } else {
                response.success('Invalid emailId and Password!', 0, res);
            }
        } else {
            response.success('Invalid emailId and Password!', 0, res);
        }
    } catch (err) {
        response.failure(err, res);
    }
};
