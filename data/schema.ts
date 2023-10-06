import { appSchema, tableSchema } from "@nozbe/watermelondb";

const todoSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "todos",
      columns: [
        { name: "title", type: "string" },
        { name: "completed", type: "boolean" },
        { name: "created_at", type: "number" },
      ],
    }),
  ],
});

export default todoSchema;
