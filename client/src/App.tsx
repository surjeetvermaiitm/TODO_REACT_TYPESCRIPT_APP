import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    console.log("d", formData);
    e.preventDefault();
    const data = {
      ...formData,
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      status: false,
    };
    setTodos((todos) => [...todos, data]);
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    const updatedTodos = todos.map((todoData) => {
      if (todoData.id === todo.id) {
        todoData.name = todo.name;
        todoData.description = todo.description;
        todoData.status = true;
      }
      return todoData;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string): void => {
    const updatedTodos = todos.filter((todoData) => {
      return todoData.id !== id;
    });
    setTodos(updatedTodos);
  };
  console.log("todo", todos);
  return (
    <main className="App">
      <h1>To-do list</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo.id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};

export default App;
