import { appSchema, tableSchema } from "@nozbe/watermelondb";

const todoSchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "task",
      columns: [
        { name: "title", type: "string" },
        { name: "body", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "remark",
      columns: [
        { name: "body", type: "string" },
        { name: "task_id", type: "string", isIndexed: true },
        // { name: "is_nasty", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});

export default todoSchema;
