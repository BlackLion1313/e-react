import React, { ChangeEvent, FormEvent, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const Register = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<RegisterCredentials >({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("event", e.target.files?.[0]);
    const file = e.target.files?.[0] || "";
    setSelectedFile(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const submitPicture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/imageUpload",
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        setNewUser({ ...newUser, avatar: result.avatar });
        console.log("result", result);
      }
    } catch (error) {
      console.log("error uploading picture", error);
    }
  };

  const register = async () => {
    console.log("newUser", newUser);
    // const navigate = useNavigate();

  const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append(
      "avatar",
      newUser.avatar
        ? newUser.avatar
        : "https://st4.depositphotos.com/11634452/41441/v/600/depositphotos_414416680-stock-illustration-picture-profile-icon-male-icon.jpg"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/register",
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
      // navigate('/');
    } 
  };

  return (
    <div className="container display-flex align-items-center ">
      <h2 className="text-center mt-5">Register</h2>
      <div className="row justify-content-center mt-3">
        <div className="col-lg-12">
          <div className="input-container">
            <label htmlFor="userName">Enter your name here</label>
            <input
              type="text"
              name="userName"
              id="userName"
              className="form-control"
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              autoComplete="email"
              required
              onChange={handleInputChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              autoComplete="password"
              required
              onChange={handleInputChange}
            />
          </div>

          <form onSubmit={submitPicture}>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Your picture
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="form-control"
                onChange={handleAttachFile}
              />
            </div>
            <div className="mt-6">
            <Link to="/login">Already have an account? Login here</Link>
          </div>
            <button type="submit" className="btn btn-primary">
              Upload Picture
            </button>
          </form>

          <button onClick={register} className="btn btn-primary mt-3">
            Register
          </button>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {newUser && (
          <div className="col-md-6 text-center">
            <img src={newUser.avatar} alt="" className="avatar-picture" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
