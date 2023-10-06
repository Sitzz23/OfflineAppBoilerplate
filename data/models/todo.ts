import { Model } from "@nozbe/watermelondb";
import { field, date, text } from "@nozbe/watermelondb/decorators";

export default class Todo extends Model {
  static table = "todos";

  @text("title") title: string | undefined;
  @field("completed") completed: boolean | undefined ;
  @date("created_at") createdAt: number | undefined ;
}
