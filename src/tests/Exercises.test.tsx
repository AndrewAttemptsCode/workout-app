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
  });

  it("remove item button removes an exercise item", async () => {
    renderComponent(<ExercisePage />);

    // Target and click add new exercise button
    const addExerciseButton = screen.getByRole("button", { name: /add new exercise/i });
    await userEvent.click(addExerciseButton);

    // Expect new exercise item to be present
    const exerciseItem = screen.getByRole("textbox", { name: /exercise name/i });
    expect(exerciseItem).toBeInTheDocument();

    // Target and click remove exercise button
    const removeExerciseItemButton = screen.getByRole("button", { name: /remove item from list/i });
    await userEvent.click(removeExerciseItemButton);

    // Expect exercise item not be to present
    const removedExerciseItem = screen.queryByRole("button", { name: /exercise name/i });
    expect(removedExerciseItem).not.toBeInTheDocument();
  });

  it("Adds an additional set to the exercise item", async () => {
    renderComponent(<ExercisePage />);

    // Target and click add new exercise button
    const addExerciseButton = screen.getByRole("button", { name: /add new exercise/i });
    await userEvent.click(addExerciseButton);

    // Expect new exercise item to be present
    const exerciseItem = screen.getByRole("textbox", { name: /exercise name/i });
    expect(exerciseItem).toBeInTheDocument();

    // Target and click add additional set button
    const addNewSetButton = screen.getByRole("button", { name: /add new set/i });
    await userEvent.click(addNewSetButton);

    // Expect table to have two sets present
    const tbody = screen.getAllByRole("rowgroup")[1];
    const allRows = within(tbody).getAllByRole("row");
    expect(allRows).toHaveLength(2);
  });
})