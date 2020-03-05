import { use } from "nconf";

export default class UtilityService {
  static mapCustomerRegisterRequest(params) {
    return {
      email: params.email && params.email.toLowerCase(),
      username: params.username,
      device_id: 1232131,
      firstname: params.firstname,
      lastname: params.lastname,
      created_by: "api",
      updated_by: "api",
      created_on: new Date(),
      updated_on: new Date()
    };
  }
  static customerAttributes() {
    return [
      "user.user_id",
      "user.email",
      "user.username",
      "user.firstname",
      "user.lastname",
      "user.device_id",
      "user.created_on",
      "user.updated_on",
      "user.created_by",
      "user.updated_by"
    ];
  }
  static userAttributes() {
    return [
      "USER.user_id as userId",
      "USER.username",
      "USER.firstname",
      "USER.lastname",
      "USER.email",
      "USER.created_on",
      "USER.created_by",
      "USER.updated_on",
      "USER.updated_by"
    ];
  }
  static mapCustomerFullResponse(customer) {
    return {
      ...this.mapCustomerResponse(customer),
      ...this.mapCustomerValidations(customer),
      ...this.getAudit(customer)
    }
  }
  static mapCustomerPartialResponse(customer) {
    return {
      ...this.mapCustomerResponse(customer),
      ...this.getAudit(customer)
    }
  }
  static mapCustomerResponse(customer) {
    return {
      id: customer.user_id,
      email: customer.email,
      firstname: customer.firstname,
      lastname: customer.lastname,
    };
  }
  static mapUserRegisterRequest(user) {
    return {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      created_by: "API"
    };
  }
  static mapUserResponse(user) {
    return {
      id: user.userId,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      ...this.getAudit(user),
    };
  }
  static getAudit(item) {
    return {
      audit: {
        createdOn: item.created_on,
        createdBy: item.created_by,
        updatedOn: item.updated_on,
        updatedBy: item.updated_by
      }
    };
  }
}