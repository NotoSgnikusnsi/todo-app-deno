import { serve } from "https://deno.land/std@0.180.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.180.0/http/file_server.ts";
import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import "https://deno.land/std@0.193.0/dotenv/load.ts"

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
	// DB設定
  const MONGO_URL = `mongodb+srv://${Deno.env.get("DB_USERNAME")}:${Deno.env.get("DB_PASSWORD")}@${Deno.env.get("DB_CLUSTER")}/${Deno.env.get("DB_NAME")}?authMechanism=SCRAM-SHA-1`
  const client = new MongoClient();
	
	// スキーマ
	interface TaskSchema {
		_id: ObjectId,
		date: Date;
		task: string;
	}


  // タスクの追加
  if(req.method === "POST" && pathname === "/add-task"){
    const reqJson = await req.json();
		const date = new Date();
		try {
			await client.connect(MONGO_URL);
			const db = client.database("todo");
			const tasks = db.collection<TaskSchema>("task");
			const insertId = await tasks.insertOne({
				date: date,
				task: reqJson.task
			});
			console.log("Success!")
		} catch (error) {
			console.log("ERR:" + error)
		} finally {
			client.close();
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
