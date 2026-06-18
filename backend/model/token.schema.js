const { Schema,model } = require('mongoose');

const tokenSchema = new Schema({
    id: Schema.Types.ObjectId,

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    refreshToken: String,

    expiration: String

},{timestamps: true});

const Token = model("Token",tokenSchema);
module.exports = Token;