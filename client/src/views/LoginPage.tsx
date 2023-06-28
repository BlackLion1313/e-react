import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState<User | null>({
    userName: "",
    email: "",
    avatar: "",
  });

  const [error, setError] = useState<ResponseError | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!loginCredentials.email || !loginCredentials.password) {
      setError("Please enter both email and password.");
      return false;
    }

    if (!validateEmail(loginCredentials.email)) {
      setError("Invalid email address.");
      return false;
    }

    setError(null);
    return true;
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginCredentials),
    };

    try {
      const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}api/users/login`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        const { token, user, msg } = result;
        if (token) {
          localStorage.setItem("token", token);
          setUser(user);
          navigate("/profile");
        }
      } else {
        const result = await response.json();
        setError(result.error);
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  const checkUserStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("User is logged in");
    } else {
      console.log("User is logged out");
    }
  };



  useEffect(() => {
    checkUserStatus();
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
 
        <form onSubmit={submitLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              onChange={handleInputChange}
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500  hover:bg-gray-600  text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <p className="text-center mt-4 text-gray-800">
          Not registered?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
