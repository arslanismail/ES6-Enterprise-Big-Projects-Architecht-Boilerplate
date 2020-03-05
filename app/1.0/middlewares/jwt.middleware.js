import jsonwebtoken from "jsonwebtoken";
import AppSetting from "../../../config/app.setting"
const Jwt = {
  encode: payload => {
    const CONFIG = AppSetting.getConfig();
    console.log(CONFIG);
    return `${jsonwebtoken.sign(payload, CONFIG.APP.SECRET, {
      expiresIn: "1y",
      algorithm: "HS256"
    })}`;
  },
  verify: token => {
    const CONFIG = AppSetting.getConfig();
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, CONFIG.APP.SECRET, (err, decodedToken) => {
        if (err || !decodedToken) return reject(err);
        resolve(decodedToken);
      });
    });
  }
};
export default Jwt;