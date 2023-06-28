import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<RegisterCredentials>({
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
    console.log([e.target.name], e.target.value);
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const submitPicture = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault(); // Prevent form submission if the event exists

    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/imageUpload",
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
    await submitPicture(); // Wait for submitPicture to complete
    console.log("newUser", newUser);

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
        `${import.meta.env.VITE_SERVER_URL}api/users/register`,
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6  text-gray-800">Create an Account</h2>
        <form onSubmit={submitPicture} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="userName" className="text-lg font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-gray-700 text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              autoComplete="current-password"
              className="w-full bg-gray-100 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleAttachFile}
            className="mb-2"
          />
          <button
            type="submit"
            className="w-full bg-gray-500  hover:bg-gray-600  text-white font-bold py-2 px-4 rounded">
            Upload Picture
          </button>
        </form>
        <button
          onClick={register}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4">
          Register
        </button>
        <div className="mt-4 text-lg font-semibold"></div>
        {newUser.avatar && (
          <div>
            <img
              src={newUser.avatar}
              alt=""
              className="mt-2 rounded-full"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
