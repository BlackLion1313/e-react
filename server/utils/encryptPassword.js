import bcrypt from "bcrypt";

const hashedPassword = async (userPassword) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(userPassword, salt);

    return hash;
  } catch (error) {
    console.log("error hashing password", error);
  }
};

export { hashedPassword };