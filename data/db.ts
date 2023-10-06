import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import Todo from "./models/todo";
import todoSchema from "./schema";

const adapter = new SQLiteAdapter({
  dbName: "myDatabase",
  schema: todoSchema,
});

const database = new Database({
  adapter,
  modelClasses: [Todo],
});

export { database };
