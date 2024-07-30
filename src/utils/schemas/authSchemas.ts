import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export type TSignUpschema = z.infer<typeof signUpSchema>;

export type TResponseCreate = {
  access_token: string;
  refresh_token: string;
};

export type TCreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type TSignInSchema = z.infer<typeof signInSchema>;

//token schema
export const tokenSchema = z.object({
  username: z.string(),
  userId: z.string(),
  id: z.number(),
  iat: z.number(),
  exp: z.number(),
});
export type JwtSchema = z.infer<typeof tokenSchema>;
