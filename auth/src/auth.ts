import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getTwoFactorCnfByUserID } from "@/data/two-factor-cnf";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "@/data/account";

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

            if ( token.role && session.user ) {
                session.user.role = token.role as UserRole;
            }

            if( session.user ) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if ( session.user ) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },

        async jwt({ token }) {
            if(!token.sub)  
                return token;
            
            const existingUser = await getUserById(token.sub);

            if(!existingUser)
                return token;

            const existingAccount = await getAccountByUserId(
                existingUser.id
            );

            token.isOAuth = !!existingAccount;            
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        }
    },
    adapter : PrismaAdapter(db),
    session : { strategy : "jwt" },
    ...authConfig,
});
