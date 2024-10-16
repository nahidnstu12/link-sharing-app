"use client";

import ToastProvider from "@/@core/components/common/toast-provider";
import { UserProvider } from "@/@core/context/user.context";
import useAuth from "@/@core/hook/useAuth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "./globals.css";

/**
 * RootLayout component serves as the main layout wrapper for the application.
 */

const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated, pathname);

  useEffect(() => {
    // Redirect user if authenticated and trying to access login or register
    const publicRoutes = ["/login", "/register"];
    if (isAuthenticated && publicRoutes.includes(pathname)) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);
  return (
    <html lang="en">
      <head>
        <title>Link-sharing-app</title>
        <meta name="description" content="link sharing app" />
      </head>
      <body className="text-medium-gray bg-background-white text-4 text-base leading-12 w-full max-w-[1920px] h-screen ">
        {/* <AuthProvider> */}
        <UserProvider>
          {children}
          <ToastProvider />
        </UserProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
