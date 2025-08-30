import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/app/(protected)/_components/navbar";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body>
                    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-r from-slate-950 to-gray-800">
                        <Navbar />
                        {children}
                    </div>
                </body>
            </html>
        </SessionProvider>
    );
}
