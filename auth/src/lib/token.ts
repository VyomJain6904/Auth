import { db } from "@/lib/db";
import { getverificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

import crypto from "crypto";
import { v4 as uuid } from "uuid";

export const generateTwoFactorToken = async ( email : string ) => {
    const token = crypto.randomInt(100000 , 999999).toString();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000 );
    const existingToken = await getTwoFactorTokenByEmail(email)
    if ( existingToken ) {
        await db.twoFactorToken.delete({
            where : {
                id : existingToken.id,
            }
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data : {
            email,
            token,
            expires,
        }
    });

    return twoFactorToken;
}

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
};

export const generatePasswordResetToken = async ( email : string ) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if ( existingToken ) {
        await db.passwordResetToken.delete ({
            where : {
                id : existingToken.id,
            },
        });
    }

    const passwordResetToken = await db.passwordResetToken.create ({
        data : {
            email,
            token,
            expires,
        },
    });
    return passwordResetToken;
};
