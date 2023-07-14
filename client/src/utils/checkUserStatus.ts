const checkUserStatus = () => {
  const token = localStorage.getItem("token");
  if (token) {
    // console.log("%cuser is logged in", "color:green");
    return token;
  } else {
    // console.log("%cuser is logged out", "color:red");
    return null;
  }
};

export default checkUserStatus;