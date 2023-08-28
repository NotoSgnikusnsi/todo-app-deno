import { serve } from 'https://deno.land/std@0.180.0/http/server.ts';
import { serveDir } from 'https://deno.land/std@0.180.0/http/file_server.ts';
import { getTasks, insertTask, deleteTask } from './modules/dbConnecter.ts';

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  // タスクの取得
  if (pathname === '/get-tasks' && req.method === 'GET') {
    const response = await getTasks();
    console.log(JSON.stringify(response));
    return new Response(JSON.stringify(response));
  }

  // タスクの追加
  if (pathname === '/add-task' && req.method === 'POST') {
    const reqJson = await req.json();
    console.log(reqJson);
    if (reqJson && reqJson.task !== undefined) {
      await insertTask(reqJson.task);
      return new Response("Success inserting task.")
    }
  }

  // タスクの削除
  if (pathname === "/delete-task" && req.method === "GET") {
    const reqJson = await req.json()
    console.log(reqJson);
    if (reqJson && reqJson._id !== undefined) {
      await deleteTask(reqJson._id);
      return new Response("Success deleting task.");
      
    }
  }

  // フロントに送信
  return serveDir(req, {
    fsRoot: 'public',
    urlRoot: '',
    showDirListing: true,
    enableCors: true,
  });
});
