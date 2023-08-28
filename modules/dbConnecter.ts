import {
  Database,
  MongoClient,
} from 'https://deno.land/x/mongo@v0.31.2/mod.ts';
import { TaskSchema } from './schema.ts';
import { MONGO_URL } from './constants.ts';
import { ObjectId } from 'https://deno.land/x/web_bson@v0.3.0/mod.js';

const client = new MongoClient();
let db: Database | null = null;

// DBに接続
const initConnection = async () => {
  if (!db) {
    try {
      await client.connect(MONGO_URL);
      db = client.database('todo');
    } catch (error) {
      console.error('Error initializing database connection:', error);
      throw error;
    }
  }
};

// DBと切断
const closeConnection = async () => {
  if (db) {
    try {
      await client.close();
      db = null;
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }
};

// タスクの追加
export const insertTask = async (task: string) => {
  try {
    //Connect DB
    await initConnection();
    const tasksClient = db!.collection<TaskSchema>('task');

    // データの送信
    const now = new Date();
    const insertTask = await tasksClient.insertOne({
      date: now,
      task: task,
      complete: false,
    });
    console.log(insertTask);
  } catch (error) {
    console.error('Error inserting task:', error);
  }
  /*
  finally {
    await closeConnection();
  }
  */
};

// 全タスクの取得
export const getTasks = async () => {
  try {
    // Connect DB
    await initConnection();
    const tasksClient = db!.collection<TaskSchema>('task');

    // データの取得
    const response: TaskSchema[] = await tasksClient.find({}).toArray();
    return new Response("Success getting task.");
  } catch (error) {
    console.error('Error getting task:', error);
  }
};

// タスクの削除
export const deleteTask = async (id:ObjectId) => {
  try {
    // Connect DB
    await initConnection();
    const tasksClient = db!.collection<TaskSchema>("task");

    // データの削除
    const deleteTask = await tasksClient.deleteOne({ _id: `${id}` })
    console.log(deleteTask);
  } catch (error) {
    console.error("Error delete task:", error)
  }
}


// 特定のタスクの取得
