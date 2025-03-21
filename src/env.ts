import { z as zod } from 'zod';

const envSchema = zod.object({
  BASE_URL: zod.string(),
  PORT: zod.coerce.number().optional().default(3000),

  DATABASE_URL: zod.string().url(),

  JWT_SECRET_KEY: zod.string(),
  ACCESS_TOKEN_EXPIRE: zod.coerce
    .number()
    .optional()
    .default(1000 * 60 * 60 * 24), // 24 hours
  REFRESH_TOKEN_EXPIRE: zod.coerce
    .number()
    .optional()
    .default(1000 * 60 * 60 * 24 * 90), // 90 days
});

export default envSchema.parse(process.env);
