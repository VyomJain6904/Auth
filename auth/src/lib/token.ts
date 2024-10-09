import { getVerficationTokenByEmail } from "@/data/verfication-toekn";

import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";

export const generateVerficationToken = async ( email : string ) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerficationTokenByEmail(email);

    if ( existingToken ) {
        await db.verficationToken.delete ({
            where : {
                id : existingToken.id,
            },
        });
    }

    const verficationToekn = await db.verficationToken.create ({
        data : {
            email,
            token,
            expires,
        },
    });
    return verficationToekn;
}
