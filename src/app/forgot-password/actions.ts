"use server";

import { z } from "zod";

import { env } from "@/config/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),
});

export type ForgotPasswordState = {
  success: boolean;
  message: string;
};

export async function forgotPassword(
  _previousState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    },
  );

  if (error) {
    return {
      success: false,
      message:
        "We couldn't send the password reset email. Please try again.",
    };
  }

  return {
    success: true,
    message:
      "If an account exists with that email, you'll receive a password reset link shortly.",
  };
}