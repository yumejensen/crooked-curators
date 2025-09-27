import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context";
import axios from "axios";

export const SignInButton = () => {
  const { user, setUser } = useUserContext();
  let i = 0;
  // const handleSignIn = () => {
  //   setUser({
  //     username: `User${i++}`,
  //     loggedIn: true,
  //   });
  //   console.log(`welcome, ${user.username}`);
  // };

  const handleSignOut = () => {
    axios.get('/auth/google')
  };

  return (
    <>
      {user.loggedIn ? (
        <Link to="/" >
          Sign Out
        </Link>
      ) : (
        <a href="/auth/google/">
          Sign-In
        </a>
      )}
    </>
  );
};
