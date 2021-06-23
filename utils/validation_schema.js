import Joi from "joi";

const loginValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3),
});
const registerValidation = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(3),
  name: Joi.string().required().max(40),
  isManager: Joi.boolean(),
});
export { loginValidation, registerValidation };
