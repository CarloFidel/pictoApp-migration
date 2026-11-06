import { z } from "zod";

export const EditProfileSchema = z.object({


  name: z
    .string({ message: "Ingresa un nombre válido" })
    .min(2, { message: "El nombre tiene que tener más de una letras" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
      message: "El nombre solo puede contener letras",
    }),

  lastName: z
    .string({ message: "Ingresa un apellido válido" })
    .min(2, { message: "El apellido tiene que tener más de una letras" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
      message: "El apellido solo puede contener letras",
    }),

  avatar: z
    .string({ message: "El avatar debe ser una URL válida" })
    .optional(),

});


