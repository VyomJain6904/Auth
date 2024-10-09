"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerficationToken } from "@/lib/token";

export const register = async ( values : z.infer<typeof RegisterSchema> ) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error : "Invalid Credentials" };
    } 

    const { email , password , name } = validatedFields.data;

    const salts = await bcrypt.genSalt(15)
    const hashedPassword = await bcrypt.hash(password , salts);
 
    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return { error : "Email already exists" };
    }

    await db.user.create({
        data : {
            name,
            email,
            password : hashedPassword,
        },
    });

    const verficationToekn = await generateVerficationToken(email);

    // TODO: Send Verification Token Email

    return { success : "Verfication Email Sent" };
};
