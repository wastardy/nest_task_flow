import * as Joi from '@hapi/joi';

export const configValidationsSchema = Joi.object({
  BASE_URL: Joi.string().default('http://localhost:3000').required(),
  HOST: Joi.string().default('localhost').required(),
  PORT: Joi.number().default(3000).required(),

  // DB Configurations
  DB_HOST: Joi.string().default('localhost').required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USER: Joi.string().default('postgres').required(),
  DB_PASSWORD: Joi.string().default('postgres').required(),
  DB_NAME: Joi.string().default('task-management').required(),

  // JWT Secret Key
  JWT_SECRET_KEY: Joi.string().required(),
});
