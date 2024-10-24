'use client';

import { useCurrentRole } from "@/hooks/use-current-role";

import { UserRole } from "@prisma/client";
import { FormError } from "@/components/form-error";

interface RoleVerifyProps {
    children : React.ReactNode;
    allowedRole : UserRole;
};

export const RoleVerify = ({
    children,
    allowedRole,
} : RoleVerifyProps ) => {
    const role = useCurrentRole();

    if ( role !== allowedRole ) {
        return (
            <FormError 
                message="You Don't have Permission to view this Content"
            />
        )
    }

    return (
        <>
            {children}
        </>
    )
}
