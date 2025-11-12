import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkoutPage from "../pages/WorkoutPage";
import { WorkoutProvider } from "../contexts/WorkoutContext";
import { MemoryRouter } from "react-router-dom";

describe("Workouts page", () => {
  it("renders new workout item", async () => {
    render(
      <MemoryRouter>
        <WorkoutProvider>
          <WorkoutPage />
        </WorkoutProvider>
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /add new workout/i });
    // Add new workout item button is rendered
    expect(button).toBeInTheDocument();

    // Adds new workout item on button click
    await userEvent.click(button);
    
    // targets an element on workout item to ensure new workout item is rendered
    const workoutItem = screen.getByRole("textbox", { name: /workout name/i });
    expect(workoutItem).toBeInTheDocument();
  });
});