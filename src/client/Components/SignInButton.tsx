import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context";

export const SignInButton = () => {
  const { user, setUser } = useUserContext();
  let i = 0;
  const handleSignIn = () => {
    setUser({
      username: `User${i++}`,
      loggedIn: true,
    });
    console.log(`welcome, ${user.username}`);
  };

  const handleSignOut = () => {
    // console.log(`farewell, ${user.username}`);
    setUser({
      username: "Guest",
      loggedIn: false,
    });
  };

  return (
    <>
      {user.loggedIn ? (
        <Link to="/" onClick={handleSignOut}>
          Sign Out
        </Link>
      ) : (
        <a href="/auth/google/" onClick={handleSignIn}>
          Sign-In
        </a>
      )}
    </>
  );
};
