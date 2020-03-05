import AuthenticationController from "../controllers/auth.controller";
import UserController from '../controllers/user.controller';
module.exports = router => {
  router.post(
    "/customer/register/1.0",
    UserController.register
  );
}