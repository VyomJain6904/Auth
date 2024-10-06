"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async ( values : z.infer<typeof LoginSchema> ) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error : "Invalid Credentials" };
    } 
    const { email , password } = validatedFields.data;

    try {
        await signIn("credentials" , {
            email ,
            password,
            redirectTo : DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin" :
                    return { error : "Invalid Credentials" }
                default : 
                    return { error : "Something Went Wrong" }
            }
        }
        throw error;
    }
};
