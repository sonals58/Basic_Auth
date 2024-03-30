const { z } = require("zod");

const signupSchema = z.object({
    username: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3, {message:"Name must of 3 characters"})
    .max(255, {message:"Name must be less than 255 characters"}),
    email:z
    .string({required_error: "Email is required"})
    .trim()
    .email({message:"Invalid Email Address"})
    .min(3, {message:"Email must of 3 characters"})
    .max(255, {message:"Email must be less than 255 characters"}),
    phone: z
    .string({required_error: "Phone no. is required"})
    .trim()
    .min(10, {message:"Phone no. must of 10 characters"})
    .max(20, {message:"Phone no. must be less than 20 characters"}),
    password: z
    .string({required_error: "Password is required"})
    .min(7, {message:"Password must be morer than 7 characters"})
    .max(255, {message:"Password must be less than 255 characters"}),
});

module.exports = signupSchema;