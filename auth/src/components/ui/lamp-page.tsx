"use client";
import React from "react";
import { motion } from "framer-motion";

import { LampContainer } from "@/components/ui/lamp";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import LinkedInBadge from "@/components/auth/linkedin-page";

export function LampPage() {
    return (
        <>
            <LinkedInBadge />
            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 1,
                        duration: 1,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium text-transparent md:text-7xl"
                >
                    <div className="space-y-6 text-center">
                        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
                            Auth🔐
                        </h1>
                        <p className="text-white text-lg">
                            A Simple Authentication Service
                        </p>
                        <div>
                            <LoginButton>
                                <Button variant="secondary" size="lg">
                                    Sign In
                                </Button>
                            </LoginButton>
                        </div>
                    </div>
                </motion.h1>
            </LampContainer>
        </>
    );
}
