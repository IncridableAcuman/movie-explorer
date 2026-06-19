const { z } = require('zod');


const emailValidation = z.
    string({ required_error: "Email is required" })
    .email("Invalid email address");
const passwordValidation = z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be least 8 charactes long")
    .max(1024, "Password must be less than 1024 characters");

const registerSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .min(3, "Username must be least 3 characters long")
        .max(50, "Username must be less than 50 characters"),
    email: emailValidation,
    password: passwordValidation
});
const loginShema = z.object({
    email: emailValidation,
    password: passwordValidation
});

module.exports = { registerSchema, loginShema }