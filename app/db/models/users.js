let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let paginate = require('mongoose-paginate-v2');

let schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        emailId: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
schema.pre('save', async function (next) {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});
schema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};
schema.plugin(paginate);
module.exports = mongoose.model('users', schema);
