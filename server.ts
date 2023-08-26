import { serve } from "https://deno.land/std@0.180.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";
import { insertTask } from "./dbConnecter.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

	if (req.method === "GET") {
		console.log("GET")
	} else if (req.method === "POST") {
		console.log("OK")
		// タスクの追加
		if(pathname === "/add-task"){
			const reqJson = await req.json();
			console.log(reqJson)
			if ( reqJson && reqJson.task !== undefined) {
				await insertTask(reqJson.task);
				return new Response("success");
			}
		}
		
	}

	// フロントに送信
  return serveDir(req, {
      fsRoot: "public",
      urlRoot: "",
      showDirListing: true,
      enableCors: true,
  });
})
