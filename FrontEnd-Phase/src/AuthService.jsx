import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { IP } from "./App";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  let loginUser = async (loginData) => {
    try {
      const response = await axios.post(`${IP}/user/login/`, loginData);
      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        return "success";
      }
    } catch (e) {
      if (e.response.status === 401) {
        return "wrong";
      }
      if (e.response.data.error === "Login Failed (password is wrong)") {
        return "password";
      } else if (e.response.data.error === "Username does not exists") {
        return "username";
      } else {
        return "error";
      }
    }
  };
  let logOutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  let updateToken = async () => {
    console.log("update");
    let response = await fetch(`${IP}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logOutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };
  let contextData = {
    login: loginUser,
    user: user,
    logout: logOutUser,
    authTokens: authTokens,
  };

  useEffect(() => {
    if (loading && authTokens !== null) {
      updateToken();
    } else {
      setLoading(false);
    }
    let fiveMinutes = 1000 * 60 * 5;
    let interval = setInterval(() => {
      if (authTokens !== null) {
        updateToken();
      }
    }, fiveMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
