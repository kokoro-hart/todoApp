import { element, render } from "./view/html-util.js";

export class App {
  mount() {
    const inputElement = document.getElementById('js-form-input');
    const formElement = document.getElementById('js-form');
    const containerElement = document.getElementById('js-todo-list');
    const todoItemCountElement = document.getElementById('js-todo-count');

    // todoリストを囲むlist要素
    const todoListElement = element`<ul />`;

    // todoアイテムカウント
    let todoItemCount = 0;
    formElement.addEventListener('submit', event => {
      event.preventDefault();
      // 追加するTodoアイテムの要素(li要素)を作成する
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      // TodoアイテムをtodoListElementに追加する
      todoListElement.appendChild(todoItemElement);
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);
      // Todoアイテム数を+1し、表示されてるテキストを更新する
      todoItemCount++;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      // 入力欄を空文字列にしてリセットする
      inputElement.value = "";
    }); 
  }
}
