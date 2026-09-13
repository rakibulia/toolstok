import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const LOGO_BUCKET = "tool-logos";

export type LogoUploadInput = {
  path: string;
  body: Buffer;
  contentType: string;
  cacheControl?: string;
};

export type LogoUploadResult = {
  path: string;
  publicUrl: string;
};

export interface LogoStorage {
  upload(input: LogoUploadInput): Promise<LogoUploadResult>;
  remove(path: string): Promise<void>;
  getPublicUrl(path: string): string;
}

class SupabaseLogoStorage implements LogoStorage {
  private readonly supabase = createSupabaseAdminClient();

  async upload(
    input: LogoUploadInput,
  ): Promise<LogoUploadResult> {
    const { error } = await this.supabase.storage
      .from(LOGO_BUCKET)
      .upload(input.path, input.body, {
        contentType: input.contentType,
        cacheControl: input.cacheControl ?? "31536000",
        upsert: true,
      });

    if (error) {
      throw new Error(
        `Failed to upload logo: ${error.message}`,
      );
    }

    return {
      path: input.path,
      publicUrl: this.getPublicUrl(input.path),
    };
  }

  async remove(path: string): Promise<void> {
    const { error } = await this.supabase.storage
      .from(LOGO_BUCKET)
      .remove([path]);

    if (error) {
      throw new Error(
        `Failed to remove logo: ${error.message}`,
      );
    }
  }

  getPublicUrl(path: string): string {
    const { data } = this.supabase.storage
      .from(LOGO_BUCKET)
      .getPublicUrl(path);

    return data.publicUrl;
  }
}

export function createLogoStorage(): LogoStorage {
  return new SupabaseLogoStorage();
}