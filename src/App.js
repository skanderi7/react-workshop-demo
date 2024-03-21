import React, { useState } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import TodoItem from "./components/TodoItem";

function App() {
  const [todoItems, setTodoItems] = useState([
    {
      key: 0,
      completed: false,
      title: "Do the laundry",
    },
  ]);

  const deleteTodo = (key) => {
    const newTodoItems = todoItems.filter((item) => item.key !== key);
    setTodoItems(newTodoItems);
  };

  const completeTodo = (key) => {
    const newTodoItems = todoItems.map((item) => {
      if (item.key === key) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodoItems(newTodoItems);
  };

  const addTodo = (title) => {
    const key = Date.now();
    setTodoItems((prev) => [...prev, { key: key, completed: false, title: title}]);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>My Todo List</h1>
      </header>
      <div className="body-container">
        <TodoContainer name="My Daily Tasks">
          <input
            type="text"
            placeholder="Add a todo"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo(e.target.value);
                e.target.value = "";
              }
            }}
          />
          {todoItems.map((item) => (
            <TodoItem
              key={item.key}
              completed={item.completed}
              title={item.title}
              onDelete={() => deleteTodo(item.key)}
              onComplete={() => completeTodo(item.key)}
            />
          ))}
        </TodoContainer>
      </div>
    </div>
  );
}

export default App;
