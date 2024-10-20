"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateverificationToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { sendverificationEmail } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/token";
import { sendTwoFactorTokenMail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorCnfByUserID } from "@/data/two-factor-cnf";

export const login = async ( values : z.infer<typeof LoginSchema> ) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error : "Invalid Credentials" };
    } 
    const { email , password , code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if ( !existingUser || !existingUser.email || !existingUser.password ) {
        return { error : "Email does not Exists !" };
    }

    if ( !existingUser.emailVerified ) {
        const verificationToken = await generateverificationToken( existingUser.email );

        await sendverificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return { success : "Confirmation Email Sent!" }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if ( code ) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email
            );
            
            if ( !twoFactorToken ) {
                return { error : "Invalid Code" };
            }
            
            if ( twoFactorToken.token !== code ) {
                return { error : "Invalid Code" };
            }

            const hasExpired = new Date( twoFactorToken.expires ) < new Date(); 

            if ( hasExpired ) {
                return { error : "Code Expired" };
            }

            await db.twoFactorToken.delete({
                where : { id : twoFactorToken.id },
            });

            const existingCnf = await getTwoFactorCnfByUserID( existingUser.id );

            if (existingCnf) {
                await db.twoFactorCnf.delete ({
                    where : { id : existingCnf.id }
                })
            }

            await db.twoFactorCnf.create({
                data : {
                    userId : existingUser.id,
                }
            });

        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
    
            await sendTwoFactorTokenMail(
                twoFactorToken.email,
                twoFactorToken.token,
            );
    
            return { twoFactor : true }
        }
    };

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
