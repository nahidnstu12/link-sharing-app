import Index from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

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

describe("Index Component", () => {
  it("renders the main heading", () => {
    render(<Index />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Dev Link Share App");
  });

  it("renders the navigation text and links", () => {
    render(<Index />);
    const paragraph = screen.getByText(/If you logged in, go to/i);
    expect(paragraph).toBeInTheDocument();
  });

  it("renders Home link with correct href and styling", () => {
    render(<Index />);
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/home");
    // Test each class separately
    expect(homeLink).toHaveClass("text-blue-500");
    expect(homeLink).toHaveClass("underline");
  });

  it("renders Login link with correct href", () => {
    render(<Index />);
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
    expect(loginLink).toHaveClass("text-blue-500", "underline");
  });

  it("maintains correct paragraph structure", () => {
    render(<Index />);
    const paragraph = screen.getByText((content:any, element:any) => {
      if (!element || !content || !element.textContent) return false;
      const hasText = (text: string) =>
        element?.textContent?.toLowerCase().includes(text.toLowerCase());

      return (
        element?.tagName.toLowerCase() === "p" &&
        hasText("if you logged in, go to") &&
        hasText("home") &&
        hasText("or") &&
        hasText("login") &&
        hasText("page")
      );
    });
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("text-center", "text-base", "my-4");
  });
});
