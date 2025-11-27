import "@testing-library/jest-dom";
import { screen, render, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { DashboardProvider } from "../contexts/DashboardContext";
import DashboardWeeklyTracker from "../components/DashboardWeeklyTracker";

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
})