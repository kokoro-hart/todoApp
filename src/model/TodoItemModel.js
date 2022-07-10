let todoIdx = 0;

export class TodoItemModel {
  /** @type {number} TodoアイテムのID */
  id;
  /** @type {string} Todoアイテムのタイトル */
  title;
  /** @type {boolean} Todoアイテムが完了済みならばtrue、そうでない場合はfalse */
  completed;

  /**
   * @param {{ title: string, completed: boolean }}
   */
  constructor({ title, completed }) {
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }
}