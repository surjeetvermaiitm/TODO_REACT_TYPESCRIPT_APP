import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import { sanmpleTodo } from "../mocks/todo.mocks";

const handleUpdateTodo = jest.fn((todo) => {
  console.log(todo);
});

const handleDeleteTodo = jest.fn((id) => console.log(id));

function renderComponent() {
  render(
    <TodoItem
      updateTodo={handleUpdateTodo}
      deleteTodo={handleDeleteTodo}
      todo={sanmpleTodo}
    />
  );
}

describe("Todo Item test cases", () => {
  it("Should render Todo Text", () => {
    renderComponent();
    const todoText = screen.getByText("Daily early routine");
    expect(todoText).toBeInTheDocument();
  });

  it("Should render Todo description Text", () => {
    renderComponent();
    const descriptionText = screen.getByText("Wake up at 6 AM");
    expect(descriptionText).toBeInTheDocument();
  });

  it("Should render Complete Button", () => {
    renderComponent();
    const completeButton = screen.getByRole("button", { name: "Complete" });

    expect(completeButton).toBeInTheDocument();
  });

  it("Should render Delete Button", () => {
    renderComponent();
    const deleteButton = screen.getByRole("button", { name: "Delete" });

    expect(deleteButton).toBeInTheDocument();
  });

  it("Should call handleUpdateTodo function when Complete Button is Clicked", () => {
    renderComponent();

    const completeButton = screen.getByRole("button", { name: "Complete" });

    fireEvent.click(completeButton);

    expect(handleUpdateTodo).toBeCalledTimes(1);
  });

  it("Should call handleDeleteTodo function when Delete Button is Clicked", () => {
    renderComponent();

    const deleteButton = screen.getByRole("button", { name: "Delete" });

    fireEvent.click(deleteButton);

    expect(handleDeleteTodo).toBeCalledTimes(1);
  });
});
