"use client";

import ToastProvider from "@/@core/components/common/toast-provider";
import { AuthProvider } from "@/@core/context/auth.context";
import { LinkProvider } from "@/@core/context/link.context";
import React from "react";

/**
 * RootLayout component serves as the main layout wrapper for the application.
 */

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <AuthProvider>
      <LinkProvider>
        {children}
        <ToastProvider />
      </LinkProvider>
    </AuthProvider>
  );
};

export default DashboardLayout;
