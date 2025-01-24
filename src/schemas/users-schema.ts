import { z } from 'zod';
import { SchemaMessageTypes } from '@/utils';

export const usersSchema = z.object({
  email: z
    .string({ message: SchemaMessageTypes.INVALID_TYPE })
    .email({ message: SchemaMessageTypes.INVALID_EMAIL })
    .trim()
    .refine((value) => value !== '', {
      message: SchemaMessageTypes.REQUIRED_FIELD,
    }),
  username: z
    .string({ message: SchemaMessageTypes.INVALID_TYPE })
    .trim()
    .refine((value) => value !== '', {
      message: SchemaMessageTypes.REQUIRED_FIELD,
    }),
  gender: z
    .string({ message: SchemaMessageTypes.INVALID_TYPE })
    .trim()
    .refine((value) => value !== '', {
      message: SchemaMessageTypes.REQUIRED_FIELD,
    }),
  age: z
    .number({ message: SchemaMessageTypes.INVALID_TYPE })
    .refine((value) => value > 0, {
      message: SchemaMessageTypes.REQUIRED_FIELD,
    }),
});

export type UsersSchemaType = z.infer<typeof usersSchema>;
export type UsersDataType = UsersSchemaType & { id: number };
