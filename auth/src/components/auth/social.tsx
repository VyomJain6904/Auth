"use client";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => {}}
            >
                <FcGoogle className="h-7 w-7"/>
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => {}}
            >
                <FaGithub className="h-7 w-7"/>
            </Button>
        </div>
    );
};
