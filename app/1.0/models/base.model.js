import DB from "../../../config/database/index";
import Joi from "joi";
import KnexQueryBuilder from "knex/lib/query/builder";

export default class BaseModel {
  constructor() {
    this.DB = this.addPagination(DB);
    this.joiErrors = null;
  }

  addPagination(DB) {
    KnexQueryBuilder.prototype.paginate = function(
      orderBy = "title",
      per_page,
      current_page
    ) {
      var pagination = {};

      var per_page = per_page || 10;
      var page = current_page || 1;

      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      console.log(offset);
      return Promise.all([
        this.clone()
          .count("* as count")
          .first(),
        this.orderBy(orderBy)
          .offset(offset)
          .limit(per_page)
      ]).then(([total, rows]) => {
        var count = total.count;
        var rows = rows;
        pagination.total = count;
        pagination.per_page = per_page;
        pagination.offset = offset;
        pagination.to = offset + rows.length;
        pagination.last_page = Math.ceil(count / per_page);
        pagination.current_page = page;
        pagination.from = offset;
        pagination.collection = rows;
        return pagination;
      });
    };

    DB.queryBuilder = function() {
      return new KnexQueryBuilder(DB.client);
    };

    return DB;
  }

  isNew() {
    return this.id ? false : true;
  }

  async errors() {
    if (this.joiErrors) {
      const { details } = this.joiErrors;
      const message = details.map(err => {
        err.path.push(err.type.split(".").pop());
        let type = `${this.constructor.name.toUpperCase()}_${err.path
          .join("_")
          .toUpperCase()}`;
        return new AppError(type);
      });
      return message;
    } else {
      this.joiErrors;
    }
  }
  async isValid() {
    const schema = Joi.object(this.schema());
    const keys = schema.describe().children;
    let values = {};
    for (var key in keys) {
      if (keys.hasOwnProperty(key)) {
        values[key] = this[key];
      }
    }
    const extra = { abortEarly: false, stripUnknown: true };
    const { error } = Joi.validate(values, schema, extra);
    this.joiErrors = error;
    const valid = error == null;
    return valid ? true : false;
  }
}
