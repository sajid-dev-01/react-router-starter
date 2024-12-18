import { createContext, useContext } from "react";

type Session = {};
type User = {};

type ContextType = {
  session?: Session | null;
  user?: User | null;
};

export const AuthContext = createContext<ContextType>({
  session: null,
  user: null,
});

export const useAuth = () => useContext(AuthContext);
