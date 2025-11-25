import "@testing-library/jest-dom";
import { beforeEach, describe, it, expect } from "vitest";
import { screen, render, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { WorkoutProvider } from "../contexts/WorkoutContext";
import ExercisePage from "../pages/ExercisePage";
import { MemoryRouter } from "react-router-dom";

const renderComponent = (children: React.ReactNode) => {
  render(
    <MemoryRouter>
      <WorkoutProvider>
        {children}
      </WorkoutProvider>
    </MemoryRouter>
  );
};

describe("Exercises Page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds new exercise item", async () => {
    renderComponent(<ExercisePage />);

    // Target and click add new exercise button
    const addExerciseButton = screen.getByRole("button", { name: /add new exercise/i });
    await userEvent.click(addExerciseButton);

    // Expect new exercise item to be present
    const exerciseItem = screen.getByRole("textbox", { name: /exercise name/i });
    expect(exerciseItem).toBeInTheDocument();
  })
})