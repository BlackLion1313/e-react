const getToken: any = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return token;
  } else {
    return false;
  }
};

export { getToken };