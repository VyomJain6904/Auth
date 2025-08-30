import { useSession } from "next-auth/react";

export const useCurrnetUser = () => {
    const session = useSession();
    return session.data?.user;
};
