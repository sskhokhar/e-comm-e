import { z } from 'zod';
export const UserCreateDTO = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string(),
  dob: z.string(),
});
