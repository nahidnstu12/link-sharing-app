"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";
import { apiGet } from "../helpers/common-api";

// REMOVE THIS FILE

interface AuthContextProps {
  token: string | null;
  user: any;
  userId: any;
  isAuthenticated: boolean;
  loginAction: (userLoginInfoData: Object) => Promise<void>;
  logOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    Cookies.get("token") || null
  );
  const [userId, setUserId] = useState<string | null>(
    Cookies.get("userId") || null
  );
  // console.log("User Context::>", userId);

  const loginAction = async (response: any) => {
    try {
      if (response) {
        const profileApi = await apiGet("/profile");
        // console.log("profileApi?.data?.data", profileApi?.data);

        setUser(profileApi?.data?.data);
        setToken(response.token);
        setUserId(profileApi?.data?.data?._id);

        Cookies.set("token", token!, { expires: 24 });
        // Cookies.set("userId", profileApi?.data?.data?._id!, { expires: 24 });
      }
    } catch (err: any) {
      console.log("login err>", err);

      
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        userId,
        isAuthenticated: !!user,
        loginAction,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
