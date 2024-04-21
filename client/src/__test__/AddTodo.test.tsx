import React from "react";
import { render, screen } from "@testing-library/react";
import AddTodo from "../components/AddTodo";

const handleSaveTodo = jest.fn(() => {});
function renderComponent() {
  render(<AddTodo saveTodo={handleSaveTodo} />);
}

describe("Add Todo form test case", () => {
  it("Should render Todo Text", () => {
    renderComponent();
    const TodoText = screen.getByText("To-do");
    expect(TodoText).toBeInTheDocument();
  });

  it("Should render description Text", () => {
    renderComponent();

    const TodoText = screen.getByText("Description");
    expect(TodoText).toBeInTheDocument();
  });

  it("Should render Add Button", () => {
    renderComponent();

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("Should render Two Input Box", () => {
    renderComponent();

    const inputBoxes = screen.getAllByRole("textbox");

    expect(inputBoxes.length).toBe(2);
  });
});
