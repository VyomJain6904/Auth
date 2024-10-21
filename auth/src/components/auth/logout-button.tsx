import { signOut } from "next-auth/react";

export const LogoutButton = ({
    children,
} : { children ?: React.ReactNode }) => {
    const onClick = () => {
        signOut();
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
