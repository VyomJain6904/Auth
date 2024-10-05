"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { SignUpForm } from "@/components/auth/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "../../../schemas";
import { register } from "../../../actions/register";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import React, { useState } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const RegisterForm = () => {

	const [ isPending , startTransition ] = useTransition();
	const [ error , setError ] = useState<string | undefined>("");
	const [ success , setSuccess ] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			name : "",
		},
	});

    const onSubmit = (values : z.infer<typeof RegisterSchema>) => {
        
		setError("");
		setSuccess("");

		startTransition(() => {
			register(values)
				.then((data) => {
					setError(data.error);
					setSuccess(data.success);
				});
		});
    };

	const LabelInputContainer = ({
		children,
		className,
	}: {
		children: React.ReactNode;
		className?: string;
	}) => {
		return (
			<div className={cn("flex flex-col space-y-2 w-full", className)}>
				{children}
			</div>
		);
	};

	const BottomGradient = () => {
		return (
			<>
				<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
				<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
			</>
		);
	};

	return (
		<CardWrapper
			headerLabel="Create an Account"
			backButtonLabel="Already have an Account"
			backButtonHref="/login"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
					<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<LabelInputContainer className="mb-4">
											<Input
												{...field}
												disabled={isPending}
												id="name"
												placeholder="john doe"
												type="name"
											/>
										</LabelInputContainer>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<LabelInputContainer className="mb-4">
											<Input
												{...field}
												disabled={isPending}
												id="email"
												placeholder="john.doe@example.com"
												type="email"
											/>
										</LabelInputContainer>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<LabelInputContainer className="mb-4">
											<Input
												{...field}
												disabled={isPending}
												id="password"
												placeholder="**********"
												type="password"
											/>
										</LabelInputContainer>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
					<button
						disabled={isPending}
						className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit"
					>
						Create an Account &rarr;
						<BottomGradient />
					</button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default RegisterForm;
