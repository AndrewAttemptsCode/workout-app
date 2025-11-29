import "@testing-library/jest-dom";
import { screen, within, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
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

describe("Workout timer page", () => {
  it("No workout timer data results in blank timer", () => {
    renderComponents();

    expect(screen.getByText(/no current exercise/i)).toBeInTheDocument();
  });
});