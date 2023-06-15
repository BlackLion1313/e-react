import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {};

const LoginPage = (props: Props) => {
  //email and pass of the user
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  //this should belong to const
  const [user, setUser] = useState<User | null>({
    userName: "",
    email: "",
    avatar: "",
  });

  const [error, setError] = useState<ResponseError>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginCredentials.email);
    urlencoded.append("password", loginCredentials.password);

    const requestOptions = {
      method: "POST",
      headers: myHeader,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/login",
        requestOptions
      );
      console.log("response", response);

      if (response.ok) {
        const result = (await response.json()) as FetchLoginResult;
        //store the token(ls)
        const { token, user, msg } = result;
        if (token) {
          localStorage.setItem("token", token);
          setUser(result.user);
        }
        console.log("result", result);

        if (response.status === 404) {
          const result: FetchError = await response.json();
          setError(result.error);
        }
      }
    } catch (error) {
      console.log("error during login", error);
    }

    console.log("loginCredentials", loginCredentials);
  };
  const checkUserStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("user is logged in");
    } else {
      console.log("user is logged out");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    checkUserStatus();
  }, [user]);

  return (
    <div className="container">
      <h1>Login Page</h1>
      {error && <h2>{error}</h2>}
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="login-email"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="login-password"
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
