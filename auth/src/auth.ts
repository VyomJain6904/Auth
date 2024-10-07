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

    callbacks : {

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
