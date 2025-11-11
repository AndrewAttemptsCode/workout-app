import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FaqSection from "../components/FaqSection";

describe("FAQ section component", () => {
  it("FAQ question toggles answer to be visible/not visible", async () => {
    render(<FaqSection />);
    const question = screen.getByText("Do I need an account?");
    const answer = screen.getByText("No, you do not need an account to use this app.");

    // Initial render - starts as hidden
    expect(answer).not.toBeVisible();
    
    // User clicks button - answer visible
    await userEvent.click(question);
    expect(answer).toBeVisible();

    // User clicks same button - ends as hidden
    await userEvent.click(question);
    expect(answer).not.toBeVisible();
  });

  it("closes the original answer when a new question is opened and displays the new answer", async () => {
    render(<FaqSection />);
    const question = screen.getByText("Do I need an account?");
    const answer = screen.getByText("No, you do not need an account to use this app.");
    const question2 = screen.getByText("Is my data stored online?");
    const answer2 = screen.getByText("No, everything is stored locally in your device browser.");
    
    // Initial render - starts as hidden
    expect(answer).not.toBeVisible();
    
    // User clicks button - answer visible
    await userEvent.click(question);
    expect(answer).toBeVisible();

    // User clicks another button - original as hidden and new as visible
    await userEvent.click(question2);
    expect(answer).not.toBeVisible();
    expect(answer2).toBeVisible();
  });

});