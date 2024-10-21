"use client";

import { useCurrnetUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
	const user = useCurrnetUser();

	const onClick = () => {
		signOut();
	};

	return (
		<div  className="bg-white p-5 rounded-2xl"> 
			<button onClick={onClick} type="submit">
				Sign Out
			</button>
		</div>
	);
};

export default SettingsPage;
