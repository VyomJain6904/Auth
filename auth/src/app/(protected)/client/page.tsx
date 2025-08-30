"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrnetUser } from "@/hooks/use-current-user";

const ServerPage = () => {
    const user = useCurrnetUser();

    return <UserInfo label="Client Component" user={user} />;
};

export default ServerPage;
