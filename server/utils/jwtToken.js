import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

//generate TOKEN
const issueToken = (userId) => {
  const options = {
    //setting expiration time before blabla
    expiresIn: "1d",
    issuer: "Mila",
  };

  const payload = {
    //here we can put also options from options, but short-read documentation
    sub: userId,
  };

const secretOrPrivateKey = process.env.JWT_SECRET

//ANY NAMES
const token = jwt.sign(payload, secretOrPrivateKey, options);
console.log('token', token)
return token;
}
export { issueToken }; 