"use client";

import { useRouter } from "next/navigation";
import React, { ComponentType, useEffect } from "react";
import Loading from "./Loading";
import useAuth from "@/@core/hook/useAuth";

/**
 * A higher-order component (HOC) that wraps a component to enforce authentication.
 */

const withAuth = <P extends object>(
  Component: ComponentType<P>
): React.FC<P> => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (isAuthenticated === false) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated === null) {
      return <Loading />;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
