const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
let ObjectId = Schema.Types.ObjectId;

//create user schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    createDate: { type: Date, default: Date.now() },
    lastLoginDate: { type: Date, default: Date.now() }
});
// , {
//     collection: 'User'
// }

userSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

userSchema.methods = {
    comparePassword: (uipwssword, dbpassword) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(uipwssword, dbpassword, (err, isMatch) => {
                if (!err) resolve(isMatch);
                else reject(err);
            });
        })
    }
}



// publish 
mongoose.model('User', userSchema)