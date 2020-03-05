import AuthService from "../services/auth.service";

class AuthenticationController {
  constructor() {}

  async verifyToken(request, response, next) {
    try {
      let authService = new AuthService(request);
      let result = await authService.verifyToken();
      if (result) {
        request.customer = result.customer;
      }
      next();
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
}
export default new AuthenticationController();