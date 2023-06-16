import React, { useState } from "react";
import { getToken } from "../utils/getToken";


function Profile(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const getProfile = (): void => {
    const token: string | null = getToken();

    if (token) {
      const myHeaders: Headers = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
      };

      fetch("http://localhost:5001/api/users/profile", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setUserProfile({
            userName: result.user.userName,
            email: result.user.email,
            avatar: result.user.avatar,
          });
          setError(null);
        })
        .catch((error) => console.log("error", error));
    } else {
      console.log("you need to Login first");
      setError("you need to Login first");
      setUserProfile(null);
    }
  };

  return (
    <div>
      <h3>User Profile</h3>
      <button onClick={getProfile}>Get Profile</button>
      {userProfile && (
        <div>
          <p>{userProfile.userName}</p>
          <p>{userProfile.email}</p>
          <img
            style={{ width: "100px" }}
            src={userProfile.avatar}
            alt=""
          />
        </div>
      )}
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
    </div>
  );
}

export default Profile;
