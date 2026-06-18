const authService = require("../services/auth.service");
class AuthController {

    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const user = await authService.refresh(username, email, password);
            return res.status(200).json({ message: "success", user });
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            return res.status(200).json({ message: "success", user });
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

}
module.exports = new AuthController();