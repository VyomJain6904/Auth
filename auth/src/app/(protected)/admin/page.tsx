'use client'

import { RoleVerify } from "@/components/auth/role-verify";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";

const AdminPage = () => {

    return (  
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    ADMIN🔑
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleVerify allowedRole={UserRole.ADMIN}>
                    <FormSuccess 
                        message="You are Allowed to see the Content"
                    />
                </RoleVerify>
            </CardContent>
        </Card>
    );
}

export default AdminPage;
