"use client";

import ToastProvider from "@/@core/components/common/toast-provider";
import { LinkProvider } from "@/@core/context/link.context";
import React from "react";

/**
 * RootLayout component serves as the main layout wrapper for the application.
 */

const PreviewLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <LinkProvider>
    {children}
    <ToastProvider />
  </LinkProvider>
);

export default PreviewLayout;
