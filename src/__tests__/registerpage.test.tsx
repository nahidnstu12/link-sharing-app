import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { apiPost } from "@/@core/helpers/common-api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SignUp from "@/app/(auth-group)/register/page";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/@core/helpers/common-api", () => ({
  apiPost: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock the next/link component
jest.mock("next/link", () => {
  return ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

describe("SignUp Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it("renders all form elements correctly", () => {
    render(<SignUp />);

    // Check for headings and text
    expect(screen.getByText("Create account")).toBeInTheDocument();
    expect(
      screen.getByText("Let's get you started sharing your links!")
    ).toBeInTheDocument();

    // Check for all input fields
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Check for submit button
    expect(
      screen.getByRole("button", { name: /Create a new account/i })
    ).toBeInTheDocument();

    // Check for login link
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("displays validation errors for empty form submission", async () => {
    render(<SignUp />);

    const submitButton = screen.getByRole("button", {
      name: /Create a new account/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("First name is required")).toBeInTheDocument();
      expect(screen.getByText("Last name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("displays validation error for invalid email", async () => {
    render(<SignUp />);

    const emailInput = screen.getByLabelText(/Email address/i);
    await userEvent.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", {
      name: /Create a new account/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("submits form successfully with valid data", async () => {
    render(<SignUp />);

    const mockResponse = { status: 200 };
    (apiPost as jest.Mock).mockResolvedValueOnce(mockResponse);

    // Fill in form fields
    await userEvent.type(screen.getByLabelText(/First Name/i), "John");
    await userEvent.type(screen.getByLabelText(/Last Name/i), "Doe");
    await userEvent.type(
      screen.getByLabelText(/Email address/i),
      "john@example.com"
    );
    await userEvent.type(screen.getByLabelText(/Password/i), "password123");

    // Submit form
    const submitButton = screen.getByRole("button", {
      name: /Create a new account/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(apiPost).toHaveBeenCalledWith("/register", {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        password: "password123",
      });
      expect(toast.success).toHaveBeenCalledWith("Registration Successful");
      expect(mockRouter.push).toHaveBeenCalledWith("/login");
    });
  });

  it("handles API error during submission", async () => {
    render(<SignUp />);

    const mockError = { message: "Registration failed" };
    (apiPost as jest.Mock).mockRejectedValueOnce(mockError);

    // Fill in form fields
    await userEvent.type(screen.getByLabelText(/First Name/i), "John");
    await userEvent.type(screen.getByLabelText(/Last Name/i), "Doe");
    await userEvent.type(
      screen.getByLabelText(/Email address/i),
      "john@example.com"
    );
    await userEvent.type(screen.getByLabelText(/Password/i), "password123");

    // Submit form
    const submitButton = screen.getByRole("button", {
      name: /Create a new account/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Registration failed");
    });
  });
});
