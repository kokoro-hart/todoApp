import { element, render } from "./view/html-util.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";

export class App {
  // TodoListModelの初期化
  #todoListModel = new TodoListModel();

  mount() {
    const formElement = document.getElementById('js-form');
    const inputElement = document.getElementById('js-form-input');
    const containerElement = document.getElementById('js-todo-list');
    const todoItemCountElement = document.getElementById('js-todo-count');

    //  TodoListModelの状態が更新されたら値を更新する
    this.#todoListModel.onChange(() => {
      // TodoリストをまとめるList要素
      const todoListElement = element`<ul />`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#todoListModel.getTodoItems();
      todoItems.forEach(item => {
        // 完了ならchecked属性を付与、未完了ならchecked属性を外す
        const todoItemElement = item.completed
          ? element`
          <li><input type="checkbox" class="checkbox" checked>
            <s>${item.title}</s>
            <button class="delete">x</button>
          </li>`
          : element`
          <li><input type="checkbox" class="checkbox">
            ${item.title}
            <button class="delete">x</button>
          </li>`
          ;
        const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
        inputCheckboxElement.addEventListener('change', () => {
          this.#todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          })
        })
        const deleteButtonElement = todoItemElement.querySelector('.delete');
        deleteButtonElement.addEventListener('click', () => {
          this.#todoListModel.deleteTodo({
            id: item.id
          });
        });
        todoListElement.appendChild(todoItemElement);
      });
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`
    });

    // 値が入力されたら、新しいTodoListModelを追加する
    formElement.addEventListener('submit', event => {
      event.preventDefault();
      this.#todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = '';
    })
  }
}