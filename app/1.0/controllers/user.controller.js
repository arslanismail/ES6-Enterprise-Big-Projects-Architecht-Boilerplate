import JWT from "../middlewares/jwt.middleware";
import UserService from "../services/user.service";

class UserController {
  constructor() {}

  async register(request, response, next) {

    try {
      const { customer } = request.body;
      
      let result = await UserService.findByEmail(customer.email);
      if (result) {
        response.json({
          "user": result,
          "token": JWT.encode({ user: result, type: "user" }),
          "deviceId": result.device_id
        });
      } else {
        let result = await UserService.register(customer);
        response.json({
          "user ": result,
          "token": JWT.encode({ user: result, type: "user" }),
          "deviceId": result.device_id
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async get(request, response, next) {

    try {
      const { customerId } = request.params;
      let result = await UserService.findById(customerId);
      if (result) {
        response.json({
          "user": result,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
export default new UserController();