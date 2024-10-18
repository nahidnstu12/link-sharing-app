"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiGet, apiPut } from "../helpers/common-api";

// Create the Auth context
export const AuthContext = createContext<any>(null);

const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
const IMAGE_MAX_SIZE = '2MB'
const validateFile = (file: File) => {
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    alert("Please upload an image in JPG or PNG format.");
    return false;
  }
  return true;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const profileApi = await apiGet("/profile");
        setUser(profileApi?.data?.data);
        setIsAuthenticated(!!profileApi?.data?.data?._id);
      } catch (err) {
        console.log("verifyAuth err>", err);
        setIsAuthenticated(false);
        router.push("/login");
      }
    };


    // Only verify if authentication status is not already set
    if (isAuthenticated === null|| user === null) {

      verifyAuth();
    }
  }, [isAuthenticated, router]);

  console.log("user context", user);

  // Function to handle logout
  const handleLogout = useCallback(async () => {
    try {
       await apiGet("/logout");

      setIsAuthenticated(false);
      setUser(null);
      router.push("/login");
      toast.success("Logout Successfully");
    } catch (err) {
      console.log("Logout error>", err);
      router.push("/login");
    }
  }, [router]);

  // Function to update profile
  const updateProfile = useCallback(
    async (profileData: {
      first_name: string;
      last_name: string;
      email: string;
    }) => {
      try {
        const response = await apiPut("/profile/update", profileData);
        setUser(response.data.data);
        toast.success("Profile updated successfully");
      } catch (err) {
        console.log("Profile update error>", err);
        toast.error("Failed to update profile");
      }
    },
    []
  );

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const currentFile = event.target.files?.[0];

      if (currentFile && validateFile(currentFile)) {
        const formData = new FormData();
        formData.set("file", currentFile);

        try {
          // Sending the file to the API
          const response = await fetch("/api/file/upload", {
            method: "POST",
            body: formData,
          });
          const result = await response.json();
          console.log("result", result, currentFile);

          if (result?.success) {
            setUser(result?.data);
            console.log("File uploaded successfully!");
            toast.success("File uploaded successfully!");
          } else {
            console.error("File upload failed.");
            toast.error("File uploaded successfully!");
          }
        } catch (err) {
          console.log("Image uploading error>", err);
        }
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authUser: user,
        handleLogout,
        updateProfile,
        handleFileChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
