import { CardSpotlight } from "@/components/ui/card-spotlight";
import Link from "next/link";

export function ErrorCard() {
    return (
        <CardSpotlight className="h-96 w-96">
            <p className="text-3xl font-bold relative z-20 mt-2 text-white text-center">
                Auth🔐
            </p>
            <div className="text-neutral-200 mt-4 relative z-20 p-5 text-center">
                Something went Wrong !
            </div>

            <p className="text-neutral-300 mt-4 relative z-20 text-lg p-14 text-center">
                <Link href={"/login"}>Back to Login</Link>
            </p>
        </CardSpotlight>
    );
}
