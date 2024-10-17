import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuthContext
