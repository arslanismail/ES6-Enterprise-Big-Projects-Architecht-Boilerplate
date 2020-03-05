import Joi from "joi";
import Validate from "../utilities/helpers/validator.helper";
class HeaderMiddleware {
  static AUTHORIZE() {
    const schema = Joi.object().keys({
      "content-type": Joi.string()
        .valid("application/json")
        .required()
    });
    return Validate.headers(schema);
  }
}
export default HeaderMiddleware;