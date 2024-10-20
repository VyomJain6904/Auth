import { db } from "@/lib/db";

export const getTwoFactorCnfByUserID = async ( userId : string ) => {
    try {
        const twoFactorCnf = await db.twoFactorCnf.findUnique({
            where : { userId }
        });

        return twoFactorCnf;

    } catch (error) {
            return null;
    }
}
