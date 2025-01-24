import { z } from 'zod';
import { SchemaMessageTypes } from '@/utils/';

export const loginSchema = z.object({
  email: z
    .string({ message: SchemaMessageTypes.INVALID_TYPE })
    .email({ message: SchemaMessageTypes.INVALID_EMAIL })
    .trim()
    .refine((value) => value !== '', {
      message: SchemaMessageTypes.REQUIRED_FIELD,
    }),
  password: z
    .string({ message: SchemaMessageTypes.INVALID_TYPE })
    .trim()
    .refine((value) => value !== '', {
      message: SchemaMessageTypes.REQUIRED_FIELD,
    }),
});

export type LoginFormDataType = z.infer<typeof loginSchema>;
