import JWT from "../middlewares/jwt.middleware";
import UserService from "./user.service";

export default class AuthService {
  constructor(req) {
    this.request = req;
  }
  async verifyToken() {
    let headers = this.request.headers;
    const token =
        headers && headers["x-access-token"] ? headers["x-access-token"] : false;

    if (token) {
      try {
        let decode = await JWT.verify(token);
        if (decode && decode.user) {
          let result;
          if (decode.type === "user") {
            result = await UserService.findByEmail(decode.user.email);
            if (result) return { customer: result, type: decode.type };
            throw new Error('User Not Found');
          }
        } else {
          throw new Error("TOKEN_INVALID");
        }
      } catch (err) {
        console.log(err);
        if (err instanceof Error) throw err;
        else throw new Error("TOKEN_INVALID");
      }
    } else {
      throw new Error("AUTH_TOKEN_REQUIRED");
    }
  }
}