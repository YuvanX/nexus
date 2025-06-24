import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
export async function uploadToSupabase(buffer: Buffer, fileName: string) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );

  const { data, error } = await supabase.storage
    .from(process.env.BUCKET_NAME!)
    .upload(fileName, buffer, {
      contentType: "image/png",
      upsert: true,
    });

    if(error) {
        console.log("Uploaded error: ", error.message);
        return
    } 

    const publicUrl = supabase.storage.from(process.env.BUCKET_NAME!).getPublicUrl(fileName).data.publicUrl
    return publicUrl as string

}
