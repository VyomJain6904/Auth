const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
			<div className="h-screen bg-gradient-to-r from-slate-950 to-gray-800 relative flex items-center w-full justify-center">
				{children}
			</div>
	);
};

export default AuthLayout;
