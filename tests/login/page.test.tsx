import "@testing-library/jest-dom";
import Login from "@/app/login/page";
import { render } from "@testing-library/react";

describe("Test login page", () => {
  it("Test form title", () => {
    const { getByText } = render(<Login />);
    expect(getByText("Authenticate")).toBeInTheDocument();
  });

  it("Test form button", () => {
    const { getByText } = render(<Login />);
    expect(getByText("Log in")).toBeInTheDocument();
  });

  it("Test form labels", () => {
    const { getByText } = render(<Login />);
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Password")).toBeInTheDocument();
  });
});
