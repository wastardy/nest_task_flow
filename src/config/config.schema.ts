import * as Joi from '@hapi/joi';

export const configValidationsSchema = Joi.object({
  // STAGE: Joi.string().required(),
  DB_HOST: Joi.string().default('localhost').required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USER: Joi.string().default('postgres').required(),
  DB_PASSWORD: Joi.string().default('postgres').required(),
  DB_NAME: Joi.string().default('task-management').required(),
});
