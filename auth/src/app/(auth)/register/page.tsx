import RegisterForm from "@/components/auth/register-form";
import { Suspense } from "react";

const RegisterPage = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <RegisterForm />
        </Suspense>
    );
};

export default RegisterPage;
