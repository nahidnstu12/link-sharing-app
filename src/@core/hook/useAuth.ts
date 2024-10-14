"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGet } from "../helpers/common-api";

/**
 * Custom hook to handle authentication and logout functionality.
 */
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const profileApi = await apiGet("/profile");
        setUser(profileApi?.data?.data);
        setIsAuthenticated(!!profileApi?.data?.data?._id);
      } catch (err) {
        console.log("verifyAuth err>", err);
      }
    };

    verifyAuth();
  }, []);

  //   const handleLogout = useCallback(async () => {
  //     logout();
  //     const res = await fetch("/api/logout", {
  //       method: "POST",
  //     });
  //     if (res.ok) {
  //       setIsAuthenticated(false);
  //       console.log("Logged out successfully");
  //       router.push("/login");
  //     } else {
  //       console.error("Failed to log out");
  //     }
  //   }, [logout, router]);

  return { isAuthenticated, authUser: user };
};

export default useAuth;
