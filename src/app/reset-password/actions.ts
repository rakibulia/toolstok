"use server";

import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(72, "Password is too long."),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(72, "Password is too long."),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    },
  );

export type ResetPasswordState = {
  success: boolean;
  message: string;
  fieldErrors?: {
    password?: string[];
    confirmPassword?: string[];
  };
};

export async function resetPassword(
  _previousState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check your password and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message:
        "Your password reset session has expired. Please request a new reset link.",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      message:
        "We couldn't update your password. Please try again.",
    };
  }

  return {
    success: true,
    message:
      "Your password has been updated successfully.",
  };
}