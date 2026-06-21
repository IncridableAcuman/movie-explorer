const authService = require("../services/auth.service");
class AuthController {

    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;

            const user = await authService.register(
                username,
                email,
                password
            );

            res.cookie("refreshToken", user.refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "lax",
                secure: true
            });

            return res.status(201).json({
                success: true,
                user
            });

        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000,sameSite: "lax",secure: true })
            return res.status(200).json({ message: "success", user });
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const user = await authService.refresh(refreshToken);
            res.cookie("refreshToken", user.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000,sameSite: "lax",secure: true });
            return res.status(200).json({ message: "success", user });
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await authService.logout(refreshToken);
            return res.status(200).json({ success: true, message: "Logged out" });
        } catch (error) {
            next(error);
        }
    }

}
module.exports = new AuthController();
