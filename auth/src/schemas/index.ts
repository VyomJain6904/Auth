import * as z from "zod";

export const LoginSchema = z.object({
    email : z.string().email({
        message : "Email is Required"
    }),
    password : z.string().min(8 , {
        message : "Password is Required"
    })
});

export const RegisterSchema = z.object({
    email : z.string().email({
        message : "Email is Required"
    }),
    password : z.string().min(8 , {
        message : "Password should be Minimum 8 Characters"
    }).regex(/\d.*\d.*\d/).regex(/[^a-zA-Z0-9]/),
    name : z.string().min(4 , {
        message : "Name is Required"
    }),
    
});

export const ResetSchema = z.object({
    email : z.string().email({
        message : "Email is Required"
    }),
});
