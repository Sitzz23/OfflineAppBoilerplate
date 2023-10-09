import { Model } from "@nozbe/watermelondb";
import {
  field,
  date,
  children,
  writer,
  readonly,
} from "@nozbe/watermelondb/decorators";

export default class Todo extends Model {
  static table = "task";

  static associations = {
    remarks: { type: "has_many", foreignKey: "task_id" },
  };

  @field("title") title;
  @field("body") body;
  @children("remarks") remarks;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;

  // Actionsr
  @writer async getTodo() {
    return {
      title: this.title,
      body: this.body,
      remarks: this.remarks,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  @writer async updateTodo({ title, body }) {
    return await this.update((todo) => {
      todo.title = title;
      todo.body = body;
    });
  }

  deleteAllRemarks() {
    return this.remarks.destroyAllPermanently();
  }

  @writer async deleteTodo() {
    return await Promise.all([
      this.deleteAllRemarks(),
      this.markAsDeleted(),
      this.destroyPermanently(),
    ]);
  }

  @writer async addRemark(body) {
    return await this.collections.get("remarks").create((remark) => {
      remark.todo.set(this);
      remark.body = body;
      //   remark.is_nasty = false;
    });
  }
}
