import { z } from 'zod';
import { SchemaMessageTypes } from '@/utils';

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: SchemaMessageTypes.INVALID_TYPE })
    .email({ message: SchemaMessageTypes.INVALID_EMAIL })
    .trim()
    .refine((value) => value !== '', {
      message: SchemaMessageTypes.REQUIRED_FIELD,
    }),
});

export type ForgotPasswordDataType = z.infer<typeof forgotPasswordSchema>;
