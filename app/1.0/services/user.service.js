import BaseService from "./base.service";
import { Logger } from "../../../config";
import UtilityService from "./utility.service";
const ENTITY_NAME = "user";

class UserService extends BaseService {
  constructor() {
    super();
  }
  async register(customer) {
    try {
      const mapped = UtilityService.mapCustomerRegisterRequest(customer);

      const [user_id] = await this.DB.insert(mapped)
        .into(`${ENTITY_NAME}`)
        .returning("user_id");
      if (user_id) {
        return await this.findById(user_id);
      } else {
        throw new Error("ERR_USER_NOT_REGISTERED");
      }
    }
    catch (error) {
      console.log(error);
      Logger.error(error);
      if (error instanceof Error) throw error;
      else throw new Error("ERR_CUSTOMER_SERVICE");
    }
  }
  async findByEmail(userEmail) {
    try {
      let customer = await this.DB.table(`${ENTITY_NAME} as user`)
        .select(UtilityService.customerAttributes())
        .where("user.email", userEmail)
        .first();
      return customer;
    } catch (error) {
      console.log(error);
      throw error instanceof Error
        ? error
        : new Error("ERR_AUTH_SERVICE");
    }
  }
  async findById(id) {
    try {
      let customer = await this.DB.table(`${ENTITY_NAME} as user`)
        .select(UtilityService.customerAttributes())
        .where("user.user_id", id)
        .first();
      if (customer) {
        return customer;
      } else {
        throw new Error("ERR_USER_NOT_FOUND");
      }
    } catch (error) {
      console.log(error);
      throw error instanceof Error
        ? error
        : new Error("ERR_AUTH_SERVICE");
    }
  }
}

export default new UserService();