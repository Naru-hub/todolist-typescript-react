import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.valueでinputに打ち込んだ値を取得
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  // Todoの編集
  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // チェックボックスでTodoの完了と未完了を管理
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>TodoList with TypeScript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
