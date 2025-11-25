import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkoutPage from "../pages/WorkoutPage";
import { WorkoutProvider } from "../contexts/WorkoutContext";
import { MemoryRouter } from "react-router-dom";
import ExercisePage from "../pages/ExercisePage";
import WorkoutTimerPage from "../pages/WorkoutTimerPage";
import { DashboardProvider } from "../contexts/DashboardContext";

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
    const removedWorkoutItem = screen.queryByRole("textbox", { name: /workout name/i });
    expect(removedWorkoutItem).not.toBeInTheDocument();
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
    const removedWorkoutInputTitle = screen.queryByRole("textbox", { name: /workout name/i });
    expect(removedWorkoutInputTitle).not.toBeInTheDocument();
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
    renderComponent(
      <>
        <WorkoutPage />
        <ExercisePage />
      </>
    )

    // Add workout item to the workout list
    const addWorkoutButton = screen.getByRole("button", { name: /add new workout/i });
    await userEvent.click(addWorkoutButton);

    // Add exercise item to the exercise list
    const addExerciseButton = screen.getByRole("button", { name: /add new exercise/i });
    await userEvent.click(addExerciseButton);

    // Give exercise an accessible name
    const exerciseList = screen.getByRole("region", { name: /my exercises/i });
    const exerciseTitle = within(exerciseList).getByRole("textbox", { name: /exercise name/i });
    await userEvent.click(exerciseTitle);
    await userEvent.clear(exerciseTitle);
    await userEvent.type(exerciseTitle, "bench press");

    // Lock exercise item "edit item mode", to access add to workout button
    const editButton = within(exerciseList).getByRole("button", { name: /edit item/i });
    await userEvent.click(editButton);

    // Add exercise to workout item exercise list
    const addToWorkoutButton = screen.getByRole("button", { name: /add to workout/i });
    await userEvent.click(addToWorkoutButton);

    const workoutItem = screen.getByRole("button", { name: /^add exercise to/i });
    await userEvent.click(workoutItem);

    // Check for exercise in workout item exercise list
    const workoutList = screen.getByRole("region", { name: /my workouts/i });
    const exercise = within(workoutList).getByRole("cell", { name: /bench press/i });
    expect(exercise).toBeInTheDocument();
  })

  it("exercise list item button removes exercise from list", async () => {
    renderComponent(
      <>
        <WorkoutPage />
        <ExercisePage />
      </>
    )

    // Add workout item to the workout list
    const addWorkoutButton = screen.getByRole("button", { name: /add new workout/i });
    await userEvent.click(addWorkoutButton);

    // Add exercise item to the exercise list
    const addExerciseButton = screen.getByRole("button", { name: /add new exercise/i });
    await userEvent.click(addExerciseButton);

    // Give exercise an accessible name
    const exerciseList = screen.getByRole("region", { name: /my exercises/i });
    const exerciseTitle = within(exerciseList).getByRole("textbox", { name: /exercise name/i });
    await userEvent.click(exerciseTitle);
    await userEvent.clear(exerciseTitle);
    await userEvent.type(exerciseTitle, "bench press");

    // Lock exercise item "edit item mode", to access add to workout button
    const editButton = within(exerciseList).getByRole("button", { name: /edit item/i });
    await userEvent.click(editButton);

    // Add exercise to workout item exercise list
    const addToWorkoutButton = screen.getByRole("button", { name: /add to workout/i });
    await userEvent.click(addToWorkoutButton);

    const workoutItem = screen.getByRole("button", { name: /^add exercise to/i });
    await userEvent.click(workoutItem);

    // Check for exercise in workout item exercise list
    const workoutList = screen.getByRole("region", { name: /my workouts/i });
    const exercise = within(workoutList).getByRole("cell", { name: /bench press/i });
    expect(exercise).toBeInTheDocument();

    // Remove exercise from exercise list
    const removeExerciseButton = within(workoutList).getByRole("button", { name: /remove bench press from workout/i });
    await userEvent.click(removeExerciseButton);
    expect(exercise).not.toBeInTheDocument();
  })

  it("workout is loaded into workout timer", async () => {
    renderComponent(
      <>
        <WorkoutPage />
        <ExercisePage />
        <DashboardProvider>
          <WorkoutTimerPage />
        </DashboardProvider>
      </>
    )

    // Add workout item to the workout list
    const addWorkoutButton = screen.getByRole("button", { name: /add new workout/i });
    await userEvent.click(addWorkoutButton);

    // Add exercise item to the exercise list
    const addExerciseButton = screen.getByRole("button", { name: /add new exercise/i });
    await userEvent.click(addExerciseButton);

    // Give exercise an accessible name
    const exerciseList = screen.getByRole("region", { name: /my exercises/i });
    const exerciseTitle = within(exerciseList).getByRole("textbox", { name: /exercise name/i });
    await userEvent.click(exerciseTitle);
    await userEvent.clear(exerciseTitle);
    await userEvent.type(exerciseTitle, "bench press");

    // Lock exercise item "edit item mode", to access add to workout button
    const editButton = within(exerciseList).getByRole("button", { name: /edit item/i });
    await userEvent.click(editButton);

    // Add exercise to workout item exercise list
    const addToWorkoutButton = screen.getByRole("button", { name: /add to workout/i });
    await userEvent.click(addToWorkoutButton);

    const workoutItem = screen.getByRole("button", { name: /^add exercise to/i });
    await userEvent.click(workoutItem);

    // Lock edit item mode on the workout item
    const workoutList = screen.getByRole("region", { name: /my workouts/i });
    const workoutItemEditButton = within(workoutList).getByRole("button", { name: /edit item/i });
    await userEvent.click(workoutItemEditButton);

    // Load workout into the workout timer
    const loadWorkoutButton = screen.getByRole("button", { name: /load workout/i });
    await userEvent.click(loadWorkoutButton);

    // Expect to see workout exercise within the workout timer display
    const timerDisplay = screen.getByRole("region", { name: /workout timer display/i });
    const exerciseInDisplay = within(timerDisplay).getByText(/bench press/i); 
    expect(exerciseInDisplay).toBeInTheDocument();
  })
});