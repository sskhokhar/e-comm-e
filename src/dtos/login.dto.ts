import { z } from 'zod';
export const LoginDTO = z.object({
  email: z.string(),
  password: z.string(),
});
