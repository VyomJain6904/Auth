"use client";

import { Button } from "@/components/ui/button";

import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

    const searchParams = useSearchParams();
    const callBackUrl = searchParams.get("callBackUrl");
    const onClick = (provider : "google" | "github" ) => {
        signIn(provider , {
            callBackUrl : callBackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-7 w-7"/>
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick("github")}
            >
                <FaGithub className="h-7 w-7"/>
            </Button>
        </div>
    );
};
