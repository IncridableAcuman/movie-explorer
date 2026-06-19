const { Router } = require('express');
const { body } = require('express-validator');
const authController = require("../controllers/auth.controller");
const { registerSchema, loginShema } = require("../validation/auth.validation");
const validationRequest = require("../middlewares/validation.middleware");

const router = Router();

router.post("/register",validationRequest(registerSchema),authController.register);
router.post("/login",validationRequest(loginShema),authController.login);
router.get("/refresh",authController.refresh);
router.post("/logout",authController.logout);

module.exports = router;