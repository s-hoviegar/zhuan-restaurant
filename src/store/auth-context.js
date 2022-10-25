import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isVerified: false,
  isAdmin: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const isEmailVerified =
    localStorage.getItem("isEmailVerified") === "true" ||
    localStorage.getItem("isEmailVerified") === true;
  const isAdmin =
    localStorage.getItem("isAdmin") === "true" ||
    localStorage.getItem("isAdmin") === true;
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("isEmailVerified");
    localStorage.removeItem("isAdmin");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    isVerified: isEmailVerified,
    isAdmin: isAdmin,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  let initialVerifiedEmail;
  let initialAdmin;
  if (tokenData) {
    initialToken = tokenData.token;
    initialVerifiedEmail = tokenData.isVerified;
    initialAdmin = tokenData.isAdmin;
  }

  const [token, setToken] = useState(initialToken);
  const [isEmailVerified, setIsEmailVerified] = useState(initialVerifiedEmail);
  const [isAdmin, setIsAdmin] = useState(initialAdmin);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setIsEmailVerified(null);
    setIsAdmin(null);

    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("isEmailVerified");
    localStorage.removeItem("isAdmin");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, isVerified, admin) => {
    setToken(token);
    setIsEmailVerified(!!isVerified);
    setIsAdmin(admin);

    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("isEmailVerified", !!isVerified);
    localStorage.setItem("isAdmin", admin);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      // console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    isVerified: isEmailVerified,
    isAdmin: isAdmin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
