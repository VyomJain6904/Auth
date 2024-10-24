import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
	user?: ExtendedUser;
	label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
	return (
		<Card className="w-[600px] shadow-lg">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">{label}</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">ID :</p>
					<p className="text-sm max-w-[200px] font-mono p-1 bg-slate-100 rounded-xl">
						{user?.id}
					</p>
				</div>

				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">NAME :</p>
					<p className="text-sm max-w-[200px] font-mono p-1 bg-slate-100 rounded-xl">
						{user?.name}
					</p>
				</div>

				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">EMAIL :</p>

					<p className="text-sm max-w-[300px] font-mono p-1 bg-slate-100 rounded-xl">
						{user?.email}
					</p>
				</div>

				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">ROLE :</p>

					<p className="text-sm max-w-[300px] font-mono p-1 bg-slate-100 rounded-xl">
						{user?.role}
					</p>
				</div>

				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">2FA :</p>
					<Badge 
                        variant={user ?.isTwoFactorEnabled ? "success" : "destructive"}
                        >
						    {user?.isTwoFactorEnabled ? "ON" : "OFF"}
					</Badge>
				</div>
                
			</CardContent>
		</Card>
	);
};
