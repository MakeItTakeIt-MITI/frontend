import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserLoginPage } from "../../pages/UserLoginPage";

describe("Tests DOM Rendering on User Login Page", () => {
  test("User Input Email Element exists", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserLoginPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const emailInputEl = screen.getByRole("user-email-input");
    const passwordInputEl = screen.getByRole("user-password-input");
    const showPassButtonEl = screen.getByRole("show-password-btn");
    const loginButtonEl = screen.getByRole("user-login-btn");
    const toSignupPageEl = screen.getByRole("to-signup");
    const kakaoLoginButtonEl = screen.getByRole("kakao-login-btn");

    expect(emailInputEl).toBeInTheDocument();
    expect(passwordInputEl).toBeInTheDocument();
    expect(showPassButtonEl).toBeInTheDocument();
    expect(loginButtonEl).toBeInTheDocument();
    expect(toSignupPageEl).toBeInTheDocument();
    expect(kakaoLoginButtonEl).toBeInTheDocument();
  });
});
