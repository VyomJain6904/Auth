import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";

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
            // Allow OAuth without Email Verfication
            if (account?.provider !== "credentials" ) 
                return true;

            // Prevent SIgnIN without Email Verification
            const existingUser = await getUserById(user.id);
            if ( !existingUser?.emailVerified ) 
                return false;

            // TODO: Add 2FA Check
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
