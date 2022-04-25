import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
