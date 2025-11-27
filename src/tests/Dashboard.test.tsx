import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { DashboardProvider } from "../contexts/DashboardContext";
import DashboardWeeklyTracker from "../components/DashboardWeeklyTracker";
import DashboardStats from "../components/DashboardStats";

const renderComponent = (children: React.ReactNode) => {
  render(
    <MemoryRouter>
    <DashboardProvider>
      { children }
    </DashboardProvider>
  </MemoryRouter>
  );
};

describe("Dashboard page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reset button resets weekly tracker back to defaults", async () => {
    const testDaysComplete = [
      { day: "Monday", complete: true },
      { day: "Tuesday", complete: true },
      { day: "Wednesday", complete: false },
      { day: "Thursday", complete: true },
      { day: "Friday", complete: true },
      { day: "Saturday", complete: false },
      { day: "Sunday", complete: false },
    ];

    // Set some days of the week as complete
    localStorage.setItem("daysComplete", JSON.stringify(testDaysComplete));

    // Prevent provider side effect from resetting with defaults
    const resetDates = {
      nextMonday: "2099-12-31T00:00:00.000Z",
      nextYear: "2099-12-31T00:00:00.000Z",
    };

    localStorage.setItem("nextResetDates", JSON.stringify(resetDates));

    // Render the component now that localStorage has defaults set
    renderComponent(<DashboardWeeklyTracker />);

    // Expect days to be complete/incomplete
    expect(screen.getByText(/monday is complete/i)).toBeInTheDocument();
    expect(screen.getByText(/wednesday is not complete/i)).toBeInTheDocument();

    // Press reset stat button for weekly day tracker
    const button = screen.getByRole("button", { name: /reset stats for weekly tracker/i });
    await userEvent.click(button);

    // Expect days to be reset back to defaults (complete = false)
    expect(screen.queryByText(/monday is complete/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/tuesday is not complete/i)).toBeInTheDocument();
  });

  it("reset button resets quick stats back to defaults", async () => {
    const testStats = [
      { name: "Last worked out", value: new Date().toISOString() },
      { name: "Last workout complete", value: "upper body" },
      { name: "Workouts complete", value: 1 },
      { name: "Exercises complete", value: 5 },
      { name: "Sets complete", value: 50 },
      { name: "Reps complete", value: 100 },
      { name: "Heaviest weight lifted", value: 50 },
      { name: "Total workout duration", value: 1200 },
    ];

    // Load stats with initial test values
    localStorage.setItem("stats", JSON.stringify(testStats));

    // Render the dashboard stats component
    renderComponent(<DashboardStats />);

    // Expect test stats to be present
    expect(screen.getByText(/upper body/i)).toBeInTheDocument();

    // Reset quick stats button
    const button = screen.getByRole("button", { name: /reset stats for quick stats/i });
    await userEvent.click(button);

    // Expect stats to have been reset
    expect(screen.queryByText(/upper body/i)).not.toBeInTheDocument();
  });
});