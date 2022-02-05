import { z } from 'zod';
export const AddShoppingPreferenceDTO = z.object({
  name: z.string(),
});
