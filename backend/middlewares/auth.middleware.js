const BaseError = require("../errors/base.error");
const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return next(BaseError.Unauthorized());
        }

        const accessToken = authorization.split(" ")[1];

        if (!accessToken) {
            return next(BaseError.Unauthorized());
        }

        const payload = tokenService.validateAccessToken(accessToken);

        if (!payload) {
            return next(BaseError.Unauthorized());
        }

        req.user = payload;

        next();
    } catch (error) {
        return next(BaseError.Unauthorized());
    }
};