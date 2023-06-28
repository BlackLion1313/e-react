import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

const issueToken = (userId) => {
  //   console.log("userId", userId);
  const options = {
    expiresIn: "20d",
    issuer: "Mila",
  };

  const payload = {
    sub: userId,
  };

  const secretOrPrivateKey = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secretOrPrivateKey, options);
  console.log("token!!!", token);
  return token;
};

export { issueToken };