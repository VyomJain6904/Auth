import * as z from "zod";

export const LoginSchema = z.object({
    email : z.string().email({
        message : "Email is Required"
    }),
    password : z.string().min(8 , {
        message : "Password is Required"
    }).regex(/\d.*\d.*\d/).regex(/[^a-zA-Z0-9]/),
});
