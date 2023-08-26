export interface TaskSchema {
  _id: ObjectId;
  date: Date;
  task: string;
  complete: boolean;
}
