import { EQueries } from "@enums/reactQueryTags/queries.enum";
import { editUser, IGetUserById } from "@requests/user";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

export function useMutationEditUser(currentNickName: string) {
  const queryClient = useQueryClient();
  return useMutation(editUser, {
    onSuccess: (data, { nickname, email, full_name, img_url }, context) => {
      console.log(context, data, "123123");
      nickname === currentNickName &&
        queryClient.setQueryData<IGetUserById | undefined>(
          [EQueries.userById, nickname],
          (oldData) => {
            if (oldData) {
              return {
                ...oldData,
                full_name,
                email,
                nickname,
                img_full_url: img_url,
              };
            }
          }
        );
    },
  });
}
