import Joi from "joi-browser";

export const validate = (data, schema) => {
  const { error } = Joi.validate(data, schema, { abortEarly: false });
  if (!error) return null;
  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};

export const validateProperty = ({ name, value }, schema) => {
  const obj = { [name]: value };
  const propertySchema = { [name]: schema[name] };
  const { error } = Joi.validate(obj, propertySchema);
  return error ? error.details[0].message : null;
};
