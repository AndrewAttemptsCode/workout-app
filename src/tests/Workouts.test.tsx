import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkoutPage from "../pages/WorkoutPage";
import { WorkoutProvider } from "../contexts/WorkoutContext";
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

describe("Workouts page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds new workout item", async () => {
    renderComponent(<WorkoutPage />);

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
    renderComponent(<WorkoutPage />);

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

  it("toggles edit item mode", async () => {
    renderComponent(<WorkoutPage />);

    // Add workout item to the workout list
    const addWorkoutButton = screen.getByRole("button", { name: /add new workout/i });
    await userEvent.click(addWorkoutButton);

    // Target element that is present in edit mode
    const workoutInputTitle = screen.getByRole("textbox", { name: /workout name/i });
    expect(workoutInputTitle).toBeInTheDocument();

    // Click toggle edit item button to off
    const editButton = screen.getByTitle("Lock item");
    await userEvent.click(editButton);

    // Target input element is no longer present
    expect(workoutInputTitle).not.toBeInTheDocument();
  })

  it("input title allows text", async () => {
    renderComponent(<WorkoutPage />);

    // Add workout item to the workout list
    const addWorkoutButton = screen.getByRole("button", { name: /add new workout/i });
    await userEvent.click(addWorkoutButton);

    // Target workout title input element
    const workoutInputTitle = screen.getByRole("textbox", { name: /workout name/i });

    // Remove any present value in the input field
    await userEvent.click(workoutInputTitle);
    await userEvent.clear(workoutInputTitle);

    // Checks workout title input has been cleared
    expect(workoutInputTitle).toHaveValue("");
  
    // Enter text into workout input element
    await userEvent.type(workoutInputTitle, "new workout");

    // Compare expected value
    expect(workoutInputTitle).toHaveValue("new workout");
  })

  it("exercise list is empty", async () => {
    renderComponent(<WorkoutPage />);

    // Add workout item to the workout list
    const addWorkoutButton = screen.getByRole("button", { name: /add new workout/i });
    await userEvent.click(addWorkoutButton);

    const emptyList = screen.getByText("Exercise list is currently empty...");
    expect(emptyList).toBeInTheDocument();
  })

  it("exercise list has an exercise present", async () => {

  })
});