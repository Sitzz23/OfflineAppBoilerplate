import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId";
import "react-native-get-random-values";
import { v4 } from "uuid";
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

setGenerator(() => v4());

if (__DEV__) {
  // Import connectDatabases function and required DBDrivers

  const {
    connectDatabases,
    WatermelonDB,
  } = require("react-native-flipper-databases");

  connectDatabases([
    new WatermelonDB(database), // Pass in database definition
  ]);
}


export { database };
