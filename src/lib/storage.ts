import { getSupabaseServer } from "./supabase/server";

export const DOCUMENT_BUCKET = "application-documents";
// BE-3: 60s was too short for async document downloads (viewing a document a
// minute after opening the admin panel 404'd). 10 minutes balances security
// and usability.
const SIGNED_URL_TTL_SECONDS = 600;

export async function uploadDocumentObject(
  path: string,
  data: Buffer,
  contentType: string,
): Promise<void> {
  const supabase = getSupabaseServer();
  const { error } = await supabase.storage
    .from(DOCUMENT_BUCKET)
    .upload(path, data, { contentType, upsert: false });
  if (error) throw new Error(`Storage upload failed: ${error.message}`);
}

export async function getSignedDocumentUrl(path: string): Promise<string> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase.storage
    .from(DOCUMENT_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
  if (error) throw new Error(`Signed URL failed: ${error.message}`);
  return data.signedUrl;
}
