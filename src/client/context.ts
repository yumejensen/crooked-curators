import { createContext, useContext } from "react";

// USER CONTEXT HANDLING

export interface User {
  username: string;
  loggedIn: boolean;
  // setUser: (user) => void; // I don't really know what void does here, we ball though
}

export interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType | null>(null)

export function useUserContext() {
  const user = useContext(UserContext);

  if (user === null) {
    throw new Error('User is not defined. useUserContext must be used within a UserContext')
  }
  return user
}

// export const 