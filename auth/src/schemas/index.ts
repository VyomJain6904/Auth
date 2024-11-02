import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
	.object({
		name: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		role: z.enum([UserRole.ADMIN, UserRole.USER]),
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(8)),
		newPassword: z.optional(z.string().min(8)),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) {
				return false;
			}

			return true;
		},
		{
			message: "New Password Required",
			path: ["newPassword"],
		}
	)
	.refine(
		(data) => {
			if (data.newPassword && !data.password) {
				return false;
			}

			return true;
		},
		{
			message: "Password Required",
			path: ["password"],
		}
	);

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Email is Required",
	}),
	password: z.string().min(8, {
		message: "Password is Required",
	}),
	code: z.optional(z.string().min(6)),
});

export const RegisterSchema = z.object({
	email: z.string().email({
		message: "Email is Required",
	}),
	password: z
		.string()
		.min(8, {
			message: "Password should be Minimum 8 Characters",
		})
		.regex(/\d.*\d.*\d/)
		.regex(/[^a-zA-Z0-9]/),
	name: z.string().min(4, {
		message: "Name is Required",
	}),
});

export const ResetSchema = z.object({
	email: z.string().email({
		message: "Email is Required",
	}),
});

export const NewPasswordSchema = z.object({
	password: z
		.string()
		.min(8, {
			message: "Password should be Minimum 8 Characters",
		})
		.regex(/\d.*\d.*\d/)
		.regex(/[^a-zA-Z0-9]/),
});
