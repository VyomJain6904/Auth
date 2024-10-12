import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<BackgroundBeamsWithCollision>
			<div className="h-full w-full flex items-center justify-center">
				{children}
			</div>
		</BackgroundBeamsWithCollision>
	);
};

export default AuthLayout;
