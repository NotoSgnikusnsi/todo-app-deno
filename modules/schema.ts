import { ObjectId } from 'https://deno.land/x/web_bson@v0.3.0/mod.js';
export interface TaskSchema {
  _id: ObjectId;
  date: Date;
  task: string;
  complete: boolean;
}
