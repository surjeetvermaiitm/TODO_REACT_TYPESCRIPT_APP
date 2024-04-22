import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

function renderComponent() {
  render(<App />);
}
describe("Test cases for Complete Todo App", () => {
  it("Should reneder To-do text", () => {
    renderComponent();
    const todoText = screen.getByText("To-do list");
    expect(todoText).toBeInTheDocument();
  });

  it("Should reneder Add Button", () => {
    renderComponent();
    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();
  });

  it("Should reneder inputName and inputDescription", () => {
    renderComponent();
    const inputName = screen.getByRole("textbox", { name: /to-do/i });
    const inputDescription = screen.getByRole("textbox", {
      name: /description/i,
    });

    expect(inputName).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
  });

  it("Should add todo and display todo", async () => {
    renderComponent();
    const inputName = screen.getByRole("textbox", { name: /to-do/i });
    const inputDescription = screen.getByRole("textbox", {
      name: /description/i,
    });
    const addButton = screen.getByRole("button", { name: "Add" });

    await userEvent.type(inputName, "my first todo");

    await userEvent.type(inputDescription, "Wake up at 6 am");

    await userEvent.click(addButton);

    const todoItems = screen.getAllByTestId("todoitem");

    expect(todoItems.length).toBe(1);
    expect(screen.getByText("Wake up at 6 am")).toBeInTheDocument();

    await userEvent.type(inputName, "my second todo");

    await userEvent.type(inputDescription, "Do yoga at 6:30 am");

    await userEvent.click(addButton);

    const todoItemsAfter = screen.getAllByTestId("todoitem");
    expect(todoItemsAfter.length).toBe(2);
    expect(screen.getByText("Do yoga at 6:30 am")).toBeInTheDocument();
  });

  it("Should delete todo", async () => {
    renderComponent();
    const inputName = screen.getByRole("textbox", { name: /to-do/i });
    const inputDescription = screen.getByRole("textbox", {
      name: /description/i,
    });
    const addButton = screen.getByRole("button", { name: "Add" });

    await userEvent.type(inputName, "my first todo");

    await userEvent.type(inputDescription, "Wake up at 6 am");

    await userEvent.click(addButton);

    const todoItems = screen.getAllByTestId("todoitem");

    expect(todoItems.length).toBe(1);
    expect(screen.getByText("Wake up at 6 am")).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: "Delete" });

    await userEvent.click(deleteButton);

    const todoItemsAfterDelete = screen.queryAllByTestId("todoitem");
    expect(todoItemsAfterDelete.length).toBe(0);
  });

  it("Should complete todo", async () => {
    renderComponent();
    const inputName = screen.getByRole("textbox", { name: /to-do/i });
    const inputDescription = screen.getByRole("textbox", {
      name: /description/i,
    });
    const addButton = screen.getByRole("button", { name: "Add" });

    await userEvent.type(inputName, "my first todo");

    await userEvent.type(inputDescription, "Wake up at 6 am");

    await userEvent.click(addButton);

    const todoItems = screen.getAllByTestId("todoitem");

    expect(todoItems.length).toBe(1);
    expect(screen.getByText("Wake up at 6 am")).toBeInTheDocument();

    const completeButton = screen.getByRole("button", { name: "Complete" });

    await userEvent.click(completeButton);

    const todoItemsAfterDelete = screen.queryAllByTestId("todoitem");
    expect(todoItemsAfterDelete.length).toBe(1);

    const completeButtonAfter = screen.queryByRole("button", {
      name: "Complete",
    });
    expect(completeButtonAfter).toBe(null);
  });
});
