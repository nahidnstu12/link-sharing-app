"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGet } from "../helpers/common-api-v2";

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
        console.log("hit 3>>profile api");
        const profileApi = await apiGet("/profile");
        setUser(profileApi?.data?.data);
        setIsAuthenticated(!!profileApi?.data?.data?._id);
      } catch (err) {
        console.log("verifyAuth err>", err);
        router.push("/login");
      }
    };

    if (isAuthenticated == null) {
      console.log("hit 4>>profile api");
      verifyAuth();
    }
  }, [isAuthenticated, router]);

  return { isAuthenticated, authUser: user };
};

export default useAuth;
