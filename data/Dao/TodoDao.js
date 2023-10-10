import { database } from "../db";

const todos = database.collections.get("todos");

export default {
  observeTodos: () => todos.query().observe(),
  createTodo: async ({ title, body }) => {
    await database.write(async () => {
      await todos.create((todo) => {
        todo.title = title;
        todo.body = body;
      });
    });
  },
  deleteAll: async () => {
    await database.action(async () => {
      await todos.query().destroyAllPermanently();
    });
  },
};
