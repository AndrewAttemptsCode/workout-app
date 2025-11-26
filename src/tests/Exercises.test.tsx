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

  it("edit item mode button functions", async () => {
    renderComponent(<ExercisePage />);

    // Target and click add new exercise button
    const addExerciseButton = screen.getByRole("button", { name: /add new exercise/i });
    await userEvent.click(addExerciseButton);

    // Expect new exercise item to be present and in edit mode
    const exerciseItem = screen.getByRole("textbox", { name: /exercise name/i });
    expect(exerciseItem).toBeInTheDocument();

    // Target edit item mode button and disable edit item mode
    const editModeButton = screen.getByRole("button", { name: /edit item/i });
    await userEvent.click(editModeButton);

    // Expect exercise item title input textbox not to be present
    const removedExerciseTitle = screen.queryByRole("textbox", { name: /exercise name/i });
    expect(removedExerciseTitle).not.toBeInTheDocument();

    // Expect exercise item title heading to be present
    const exerciseHeadingTitle = screen.getByRole("heading", { name: /^exercise#/i });
    expect(exerciseHeadingTitle).toBeInTheDocument();
  });

  it("exercise title updates", async () => {
    renderComponent(<ExercisePage />);

    // Target and click add new exercise button
    const addExerciseButton = screen.getByRole("button", { name: /add new exercise/i });
    await userEvent.click(addExerciseButton);

    // Expect new exercise item to be present and in edit mode
    const exerciseItem = screen.getByRole("textbox", { name: /exercise name/i });
    expect(exerciseItem).toBeInTheDocument();

    // Target exercise item input field and enter custom exercise name
    const exerciseTitleInput = screen.getByRole("textbox", { name: /exercise name/i });
    await userEvent.click(exerciseTitleInput);
    await userEvent.clear(exerciseTitleInput);
    await userEvent.type(exerciseTitleInput, "bench press");

    // Expect title to have new title
    expect(exerciseTitleInput).toHaveValue("bench press");
  });
})