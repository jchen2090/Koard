import "@testing-library/jest-dom";
import SignUp from "@/app/signup/page";
import { render } from "@testing-library/react";

describe("Test signup page", () => {
  it("Test form title", () => {
    const { getByText } = render(<SignUp />);
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  it("Test form button", () => {
    const { getByText } = render(<SignUp />);
    expect(getByText("Sign up")).toBeInTheDocument();
  });

  it("Test form labels", () => {
    const { getByText } = render(<SignUp />);
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Password")).toBeInTheDocument();
    expect(getByText("Confirm Password")).toBeInTheDocument();
  });
});
