import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../components/services/authAPI";

const Login = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AuthAPI.login({ login: credentials });
      setIsAuthenticated(true);
      // history.replace("/");
    } catch (error) {
      throw error.response;
    }
  };

  return (
    <div className="container">
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter e-mail:</label>
          <input
            type="text"
            placeholder="Enter email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Enter Password:</label>
          <input
            type="text"
            placeholder="Enter password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
