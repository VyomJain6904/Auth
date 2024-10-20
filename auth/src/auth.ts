import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getTwoFactorCnfByUserID } from "@/data/two-factor-cnf";

export const {
    handlers : { GET , POST },
    auth,
    signIn,
    signOut,
} = NextAuth ({

    pages : {
        signIn : "/login",
        error : "/error"
    },

    events : {
        async linkAccount ({ user }) {
            await db.user.update ({
                where : { id : user.id },
                data : { emailVerified : new Date() }
            })
        }
    },

    callbacks : {

        async signIn ( { user , account } ) {

            console.log({
                user,
                account,
            });

            // Allow OAuth without Email verification
            if (account?.provider !== "credentials" ) 
                return true;

            const existingUser = await getUserById(user.id);
            
            // Prevent SIgnIN without Email verification
            if ( !existingUser?.emailVerified ) 
                return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorCnf = await getTwoFactorCnfByUserID(existingUser.id);

                if (!twoFactorCnf) {
                    return false;
                }

                await db.twoFactorCnf.delete({
                    where : {
                        id : twoFactorCnf.id
                    }
                });
            }

            return true;
        },

        async session({ token , session }) {
            if ( token.sub && session.user ) {
                session.user.id = token.sub;
            }
            return session;
        },

        async jwt({ token }) {
            if(!token.sub)  
                return token;
            
            const existingUser = await getUserById(token.sub);

            if(!existingUser)
                return token;
            return token;
        }
    },
    adapter : PrismaAdapter(db),
    session : { strategy : "jwt" },
    ...authConfig,
});
