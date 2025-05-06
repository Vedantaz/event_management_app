import * as Joi from "joi";

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
  HTTP_PORT: Joi.number(),
  MAIL_PORT: Joi.number().default(587),
  MAIL_HOST: Joi.string().hostname().optional(),
  MAIL_USER: Joi.string().email().optional(),
  MAIL_PASSWORD: Joi.string().optional(),
  MAIL_FROM: Joi.string().email().optional(),
  EXPIRES_IN: Joi.string().default("1d"),
});
