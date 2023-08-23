import { serve } from "https://deno.land/std@0.180.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";
import "https://deno.land/std@0.193.0/dotenv/load.ts"

serve(async (req) => {
    const pathname = new URL(req.url).pathname;
    const mongoUrl = Deno.env.get("MONGO_URL");

    // タスクの追加
    if(req.method === "POST" && pathname === "/add-task"){
        const task = await req.json();
    }
    return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
    });
})
