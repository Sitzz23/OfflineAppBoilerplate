import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
// import { DatabaseProvider } from '@nozbe/watermelondb/react'
import Todo from "./models/Todo";
import Remark from "./models/Remark";
import todoSchema from "./schema";

const adapter = new SQLiteAdapter({
  dbName: "myDatabase",
  schema: todoSchema,
  
});

const database = new Database({
  adapter,
  modelClasses: [Todo, Remark],
});

export {database}