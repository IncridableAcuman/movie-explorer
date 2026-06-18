const { Schema,model } = require('mongoose');

const userSchema = new Schema({

    id: Schema.Types.ObjectId,
    username: {
        type:String,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email: {
        type:String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        trim: true
    }

},{timestamps: true});

const User = model("User",userSchema);
module.exports = User;