const { Schema, model, Types } = require("mongoose");

const bcrypt = require('bcrypt');

const AuthUserSchema = Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },

})


AuthUserSchema.pre("save", function (next) {
    let user = this;
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }

                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

AuthUserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = model("AuthUser", AuthUserSchema)