"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { apiGet } from "../helpers/common-api";
import { toast } from "react-toastify";

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
        router.push("/login");
      }
    };

    verifyAuth();
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const logoutApi = await apiGet("/logout");
      console.log("logout", logoutApi.data);

      setIsAuthenticated(false);
      setUser(null);
      console.log("Logged out successfully");
      router.push("/login");
      toast.success("Logout Successfully");
    } catch (err) {
      console.log("verifyAuth err>", err);
      router.push("/login");
    }
  }, [router]);

  return { isAuthenticated, authUser: user, handleLogout };
};

export default useAuth;
