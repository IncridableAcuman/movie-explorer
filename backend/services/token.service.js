const Token = require("../model/token.model");
const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, { algorithm: 'HS256', expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, { algorithm: 'HS256', expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
    async saveToken(userId,refreshToken){
        const user = await Token.findOne({user:userId});
        if(user){
            user.refreshToken=refreshToken;
            return user.save();
        }
        const token = Token.create({user:userId,refreshToken});
        return token;
    }
    getToken(refreshToken){
        return Token.findOne({refreshToken});
    }
    removeToken(refreshToken){
        return Token.findOneAndDelete({refreshToken});
    }
    validateAccessToken(token){
        try {
            return jwt.verify(token,process.env.JWT_ACCESS);
        } catch (error) {
            return null;
        }
    }
    validateRefreshToken(token){
        try {
            return jwt.verify(token,process.env.JWT_REFRESH);
        } catch (error) {
            return null;
        }
    }
}
module.exports = new TokenService();