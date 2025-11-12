import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkoutPage from "../pages/WorkoutPage";
import { WorkoutProvider } from "../contexts/WorkoutContext";
import { MemoryRouter } from "react-router-dom";

const renderWorkoutPage = () => {
  render(
      <MemoryRouter>
        <WorkoutProvider>
          <WorkoutPage />
        </WorkoutProvider>
      </MemoryRouter>
    );
};

describe("Workouts page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds new workout item", async () => {
    renderWorkoutPage();

    const button = screen.getByRole("button", { name: /add new workout/i });
    // Add new workout item button is rendered
    expect(button).toBeInTheDocument();

    // Adds new workout item on button click
    await userEvent.click(button);
    
    // targets an element on workout item to ensure new workout item is rendered
    const workoutItem = screen.getByRole("textbox", { name: /workout name/i });
    expect(workoutItem).toBeInTheDocument();
  });

  it("removes a workout item", async () => {
    renderWorkoutPage();

    // Adds workout item
    const button = screen.getByRole("button", { name: /add new workout/i });
    await userEvent.click(button);
    // Workout item is rendered
    const workoutItem = screen.getByRole("textbox", { name: /workout name/i });
    expect(workoutItem).toBeInTheDocument();
    // Remove workout item button is clicked
    const removeButton = screen.getByRole("button", { name: /remove item from list/i });
    await userEvent.click(removeButton);
    // Workout item is no longer rendered
    expect(workoutItem).not.toBeInTheDocument();
  })
});