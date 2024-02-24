import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page", () => {
  it("Test page render", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it("Test subheading render", () => {
    render(<Page />);

    const subheading = screen.getByRole("heading", { level: 2 });
    expect(subheading).toBeInTheDocument();
  });
});
