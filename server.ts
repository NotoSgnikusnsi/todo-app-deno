import { serve } from "https://deno.land/std@0.180.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";
import { insertTask, getTasks } from "./dbConnecter.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

		// タスクの取得
		if (pathname === "/get-tasks" && req.method === "GET") {
			const tasks = await getTasks();
			console.log("OK,server.ts")
			console.log(JSON.stringify(tasks))
			return JSON.stringify(tasks);
		}

		// タスクの追加
		if(pathname === "/add-task" && req.method === "POST"){
			const reqJson = await req.json();
			console.log(reqJson)
			if ( reqJson && reqJson.task !== undefined) {
				await insertTask(reqJson.task);
				return new Response("success");
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
