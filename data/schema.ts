import { appSchema, tableSchema } from "@nozbe/watermelondb";

const todoSchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "todos",
      columns: [
        { name: "title", type: "string" },
        { name: "body", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "remarks",
      columns: [
        { name: "body", type: "string" },
        { name: "todo_id", type: "string", isIndexed: true },
        // { name: "is_nasty", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});

export default todoSchema;
