"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
    values : z.infer<typeof NewPasswordSchema> ,
    token ?: string | null,
) => {
    if (!token) {
        return { error : "Missing Token" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if( !validatedFields.success ) {
        return { error : "Invalid Fields" };
    };

    const { password } = await validatedFields.data;

    const existingToken = await getPasswordResetToken(token);

    if (!existingToken) {
        return { error: "Invalid Token" };
    };

    const hasExpired = new Date( existingToken.expires ) < new Date();
    if ( hasExpired ) {
        return { error: "Token has expired" };
    };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { error: "Email not found" };
    };

    const salts = await bcrypt.genSalt(15)
    const hashedPassword = await bcrypt.hash(password , salts);

    await db.user.update({
        where : { id : existingUser.id },
        data : { password : hashedPassword },
    });

    await db.passwordResetToken.delete({
        where : { id : existingUser.id },
    });

    return { success : "Password Updated" };

};
