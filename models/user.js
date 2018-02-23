//=====================
//Model for users =====
//=====================
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        maxlength: 1
    },
    seeking: {
        type: String,
        maxlength: 1
    },
    age: {
        type: Number
    },
    img: {
        type: String,
        required: false,
        defaullt:'/public/assets/img/user.png'
    },
    bio: {
        type: String
    }, 
    rightSwipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.getSaltSync(8), null);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
