import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Test cases for Complete Todo App", () => {
  it("Should reneder To-do text", () => {
    render(<App />);
    const todoText = screen.getByText("To-do list");
    expect(todoText).toBeInTheDocument();
  });

  it("Should reneder Add Button", () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();
  });
});
