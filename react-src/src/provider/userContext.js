// import axios from 'axios';

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const BASE_URL = 'http://localhost:8080/api/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

export const reAuth = () => {
  const axis = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true,
  });
  axis.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
  return axis
}


const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      authApi.defaults.headers.common["Authorization"] = "Bearer " + token;
      //TODO - use cookie
      localStorage.setItem("token", token);
    } else {
      delete authApi.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;