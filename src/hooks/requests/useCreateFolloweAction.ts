import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import {
  createFollowAction,
  IFollowerParameters,
  IGetUserById,
} from "../../requests/user";
import { FollowerStatusEnum } from "../../enum/FollowerStatusEnum";

export function useCreateFollowerAction(): UseMutationResult<
  void, // Mutation data type
  unknown, // Error type
  IFollowerParameters // Mutation function parameter type
> {
  const queryClient = useQueryClient();
  return useMutation(createFollowAction, {
    onSuccess: (data, { nickname, isPrivate }) => {
      queryClient.setQueryData<IGetUserById | undefined>(
        ["userById", nickname],
        (oldData) =>
          oldData
            ? {
                ...oldData,
                relationStatus: isPrivate
                  ? FollowerStatusEnum.Pending
                  : FollowerStatusEnum.Accepted,
              }
            : oldData
      );
    },
  });
}
