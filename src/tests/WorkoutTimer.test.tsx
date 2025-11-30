import "@testing-library/jest-dom";
import { screen, within, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import WorkoutTimerPage from "../pages/WorkoutTimerPage";
import { WorkoutProvider } from "../contexts/WorkoutContext";
import { WorkoutTimerProvider } from "../contexts/WorkoutTimerContext";
import { DashboardProvider } from "../contexts/DashboardContext";
import WorkoutPage from "../pages/WorkoutPage";
import ExercisePage from "../pages/ExercisePage";

const renderComponents = () => {
  render(
    <MemoryRouter>
      <WorkoutProvider>
        <WorkoutPage />
        <ExercisePage />
        <WorkoutTimerProvider>
          <DashboardProvider>
            <WorkoutTimerPage />
          </DashboardProvider>
        </WorkoutTimerProvider>
      </WorkoutProvider>
    </MemoryRouter>
  );
};

const setupWorkout = async () => {
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

  // Give set a rest time of 0 seconds - avoids the delay of set complete
  const restInput = screen.getByRole("spinbutton", { name: /rest/i });
  await userEvent.click(restInput);
  await userEvent.clear(restInput);
  await userEvent.type(restInput, "0");

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
}

describe("Workout timer page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("No workout timer data, results in blank timer", () => {
    renderComponents();

    expect(screen.getByText(/no current exercise/i)).toBeInTheDocument();
  });

  it("controls button starts the workout", async () => {
    renderComponents();
    await setupWorkout();

    // Target control button to start the workout
    const button = screen.getByRole("button", { name: /start workout/i });
    await userEvent.click(button);

    // Expect control button now to display complete set
    expect(screen.getByRole("button", { name: /complete set/i })).toBeInTheDocument();

  }, 20000);

  it("control button completes a set", async () => {
    renderComponents()
    await setupWorkout();
    
    // Target control button to start workout
    const startButton = screen.getByRole("button", { name: /start workout/i });
    await userEvent.click(startButton);
    
    // Traget control button to complete the current exercise set
    const completeSetButton = screen.getByRole("button", { name: /complete set/i});
    await userEvent.click(completeSetButton);

    // Expect set to be complete via workout breakdown display
    const setComplete = screen.getByTitle(/sets complete/i);
    expect(setComplete).toHaveTextContent("1/1");

  }, 20000);

  it("controls button has option to complete the workout", async () => {
    renderComponents();
    await setupWorkout();

    // Target control button to start workout
    const startButton = screen.getByRole("button", { name: /start workout/i });
    await userEvent.click(startButton);
    
    // Traget control button to complete the current exercise set
    const completeSetButton = screen.getByRole("button", { name: /complete set/i});
    await userEvent.click(completeSetButton);

    // Expect complete workout to be present
    expect(screen.getByText(/workout complete/i)).toBeInTheDocument();
    expect(screen.getByText(/finish workout/i)).toBeInTheDocument();

  }, 20000);

  it("workout breakdown button displays and expanded", async () => {
    renderComponents();
    await setupWorkout();

    const workoutBreakdown = screen.getByRole("region", { name: /workout breakdown/i });
    const exercise = within(workoutBreakdown).getByText(/bench press/i);
    expect(exercise).toBeVisible();
  }, 20000);
});