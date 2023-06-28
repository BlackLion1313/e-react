import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
const jwtAuth = passport.authenticate("jwt", { session: false });

export default jwtAuth;