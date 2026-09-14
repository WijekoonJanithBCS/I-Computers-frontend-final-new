import { createClient } from "@supabase/supabase-js"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96ZWJvc2lrb293eHdzd29ldXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MzUzMDgsImV4cCI6MjA4OTMxMTMwOH0.i2pWcAlrgNIpRuH-V5Hi9DVZXbXOdYdbYsR25Qkh630"

const supabaseUrl = "https://ozebosikoowxwswoeutq.supabase.co"

//const supabase = createClient(supabaseUrl, supabaseKey)

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
    }
})

export default function UploadFile(file) {
    // file kiyana paramiter eka define krla thibbe nah funtion eke
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("no file provided")
            return
        }
        const timestamp = new Date().getTime()
        // new date aran thibba widiya waradai
        const fileName = timestamp + file.name
        // file name eka aran thibba widiya waradi
        supabase.storage.from("images").upload(fileName, file, {
            upsert: false,
            cacheControl: 3600
        }).then(() => {
            const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
            resolve(url)
        }).catch(
            () => {
                reject("failed to update file")
            }
        )
    }


    )
}