import otpAuthMiddleware from "./otpAuthMiddleware";
import refreshAuthorization from "./refreshAuthorization";
import {googleLoginMiddleware,googleSignupMiddelware} from "./googleAuthorizationMiddleware";
import tutorAuthorization from "./tutorAuthorizationMiddleware";
import adminAuthorization from "./adminAuthorization";
import userAuthorization from "./accessAuthorizationMiddleware";
import resetPasswordVerify from "./resetPasswordVerfiy";


export {
  otpAuthMiddleware,
  refreshAuthorization,
  googleSignupMiddelware,
  googleLoginMiddleware,
  tutorAuthorization,
  adminAuthorization,
  userAuthorization,
  resetPasswordVerify,
};