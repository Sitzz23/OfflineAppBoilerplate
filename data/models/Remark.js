import { Model } from "@nozbe/watermelondb";
import {
  field,
  relation,
  action,
  readonly,
  date,
  writer,
} from "@nozbe/watermelondb/decorators";

export default class Remark extends Model {
  static table = "remark";
  static associations = {
    todos: { type: "belongs_to", key: "task_id" },
  };

  @field("body") body;
  //   @field("is_nasty") isNasty;
  @field("task_id") todoId;
  @relation("task", "tasks_id") todo;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;

  //Actions
  @writer async deleteRemark() {
    return await Promise.all([this.markAsDeleted(), this.destroyPermanently()]);
  }
}
