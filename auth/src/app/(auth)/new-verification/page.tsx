import { NewverificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";

const Newverification = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <NewverificationForm />
        </Suspense>
    );
};

export default Newverification;
