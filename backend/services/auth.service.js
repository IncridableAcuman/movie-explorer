const tokenService = require("./token.service");
const bcrypt = require('bcryptjs');
const User = require('../model/user.model');
const UserResponse = require("../dto/user.dto");
const BaseError = require("../errors/base.error");

class AuthService {

    async register(username, email, password) {
        const existUser = await User.findOne({ email });
        if (existUser) {
            throw new BaseError.BadRequest("User already exist");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        const dto = new UserResponse(user);
        const tokens = tokenService.generateTokens({ ...dto });
        tokenService.saveToken(dto.id, tokens.refreshToken);
        return { dto, ...tokens };
    }
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new BaseError.NotFound("User not found");
        }
        const matchesPassword = await bcrypt.compare(password, user.password);
        if (!matchesPassword) {
            throw new BaseError.BadRequest("Password doesn't match");
        }
        const dto = new UserResponse(user);
        const tokens = tokenService.generateTokens({ ...dto });
        tokenService.saveToken(dto.id, tokens.refreshToken);
        return { dto, ...tokens };
    }
    async refresh(refreshToken) {
        const payload = tokenService.validateRefreshToken(refreshToken);
        const tokenDb = await tokenService.getToken(refreshToken);
        if (!payload || !tokenDb) {
            throw new BaseError.Unauthorized();
        }
        const user = await User.findById(payload.id);
        if (!user) {
            throw new BaseError.Unauthorized();
        }
        const dto = new UserResponse(user);
        const tokens = tokenService.generateTokens({ ...dto });
        tokenService.saveToken(dto.id, tokens.refreshToken);
        return { dto, ...tokens };
    }
    async logout(refreshToken) {
        return tokenService.removeToken(refreshToken);
    }

}
module.exports = new AuthService();