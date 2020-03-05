import DB from "../../../config/database";
import JWT from "../middlewares/jwt.middleware";

class BaseService {
  constructor(req) {
    if (new.target === BaseService) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.request = req;
    // this.customer = req.customer;
    this.DB = DB;
    this.JWT = JWT;
  }
}
export default BaseService;