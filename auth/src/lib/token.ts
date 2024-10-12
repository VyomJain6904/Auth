import { getverificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";

export const generateverificationToken = async ( email : string ) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getverificationTokenByEmail(email);

    if ( existingToken ) {
        await db.verificationToken.delete ({
            where : {
                id : existingToken.id,
            },
        });
    }

    const verificationtoken = await db.verificationToken.create ({
        data : {
            email,
            token,
            expires,
        },
    });
    return verificationtoken;
}
