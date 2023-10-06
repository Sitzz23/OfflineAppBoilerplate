import { Model } from "@nozbe/watermelondb";
import { field, date, text } from "@nozbe/watermelondb/decorators";

export default class Todo extends Model {
  static table = "todos";

  @text("title") title: string;
  @field("completed") completed: boolean ;
  @date("created_at") createdAt: number ;
}
