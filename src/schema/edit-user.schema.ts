import { isEmailAvailable, isNicknameAvailable } from "@requests/user";
import { z } from "zod";
import { debounce } from "@utils/functions/debounce";

const debouceNicknameExist = debounce(isNicknameAvailable, 700);
const debounceEmailExist = debounce(isEmailAvailable, 700);

export const editUserFormSchema = z.object({
  full_name: z
    .string()
    .min(3, { message: "Nome deve conter ao menos 3 caracteres." })
    .max(150, { message: "Nome deve conter no máximo 150 caracteres." }),
  nickname: z
    .string()
    .min(3, { message: "Usuário deve conter ao menos 3 caracteres." })
    .max(150, { message: "Usuário deve conter no máximo 150 caracteres." })
    .refine(
      async (value) => {
        if (value.length > 2) {
          const isAvailable = await debouceNicknameExist(value);
          if (isAvailable) {
            return true;
          }
          return false;
        }
      },
      { message: "Este usuário já está em uso" }
    ),
  email: z
    .string()
    .min(3, { message: "Email deve conter ao menos 3 caracteres." })
    .max(150, { message: "Email deve conter no máximo 150 caracteres." })
    .refine(
      async (value) => {
        if (value.length > 2) {
          const isAvailable = await debounceEmailExist(value);
          if (isAvailable) {
            return true;
          }
          return false;
        }
      },
      { message: "Este email já está em uso" }
    ),
  img_url: z.any(),
});

export type EditUserFormData = z.infer<typeof editUserFormSchema>;
