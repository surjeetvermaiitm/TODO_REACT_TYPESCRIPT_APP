import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import {
  sanmpleTodowithTrueStatus,
  sanmpleTodowithFalseStatus,
} from "../mocks/todo.mocks";

const handleUpdateTodo = jest.fn((todo) => {
  console.log(todo);
});

const handleDeleteTodo = jest.fn((id) => console.log(id));

function renderComponent(status: boolean) {
  status
    ? render(
        <TodoItem
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={sanmpleTodowithTrueStatus}
        />
      )
    : render(
        <TodoItem
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={sanmpleTodowithFalseStatus}
        />
      );
}

describe("Todo Item test cases", () => {
  it("Should render Todo Text", () => {
    renderComponent(false);
    const todoText = screen.getByText("Daily early routine");
    expect(todoText).toBeInTheDocument();
  });

  it("Should render Todo description Text", () => {
    renderComponent(false);
    const descriptionText = screen.getByText("Wake up at 6 AM");
    expect(descriptionText).toBeInTheDocument();
  });

  it("Should render Complete Button", () => {
    renderComponent(false);
    const completeButton = screen.getByRole("button", { name: "Complete" });

    expect(completeButton).toBeInTheDocument();
  });

  it("Should not render Complete Button when todo status is true", () => {
    renderComponent(true);
    const completeButton = screen.queryByRole("button", { name: "Complete" });

    expect(completeButton).toBe(null);
  });

  it("Should render Delete Button", () => {
    renderComponent(false);
    const deleteButton = screen.getByRole("button", { name: "Delete" });

    expect(deleteButton).toBeInTheDocument();
  });

  it("Should call handleUpdateTodo function when Complete Button is Clicked", () => {
    renderComponent(false);

    const completeButton = screen.getByRole("button", { name: "Complete" });

    fireEvent.click(completeButton);

    expect(handleUpdateTodo).toBeCalledTimes(1);
  });

  it("Should call handleDeleteTodo function when Delete Button is Clicked", () => {
    renderComponent(false);

    const deleteButton = screen.getByRole("button", { name: "Delete" });

    fireEvent.click(deleteButton);

    expect(handleDeleteTodo).toBeCalledTimes(1);
  });
});
