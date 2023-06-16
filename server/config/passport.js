import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt"
import userModel from "../models/usersModel.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //insert your .env variable here
  secretOrKey: "my-little-secret",
};

const jwtStrategy = new JwtStrategy(options, function (jwt_payload, done) {
  userModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      console.log("error", err);
      return done(err, false);
    }
    if (user) {
      console.log("user found");
      return done(null, user);
    } else {
      console.log("something went wrong");
      return done(null, false);
      // or you could create a new account
    }
  });
});

export { jwtStrategy };