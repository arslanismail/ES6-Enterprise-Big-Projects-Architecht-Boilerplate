import Joi from "joi";
function validate(req, res, body, schemas, next, options = undefined) {
  const extra = options || { abortEarly: false, stripUnknown: true };
  const { error } = Joi.validate(body, schemas, extra);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map(err => {
      err.path.push(err.type.split(".").pop());
      const type = err.path
        .join("_")
        // .replace(/([A-Z])/g, "_$1")
        .toUpperCase()
        .replace("-", "_");
      return new Error(err.message);
    });
    throw message;
  }
}

const ValidatorHelper = {
  params: schemas => (req, res, next) =>
    validate(req, res, req.params, schemas, next),
  headers: schemas => (req, res, next) =>
    validate(req, res, req.headers, schemas, next),
  body: schemas => (req, res, next) =>
    validate(req, res, req.body, schemas, next),
  query: schemas => (req, res, next) =>
    validate(req, res, req.query, schemas, next),
  validate: (body, schemas) => (req, res, next) =>
    validate(req, res, body, schemas, next)
};
export default ValidatorHelper;