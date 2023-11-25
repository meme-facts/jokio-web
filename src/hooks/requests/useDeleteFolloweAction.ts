import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import {
  createFollowAction,
  deleteFollowAction,
  IFollowerParameters,
  IGetUserById,
} from "../../requests/user";
import { FollowerStatusEnum } from "../../enum/FollowerStatusEnum";

export function useDeleteFollowerAction(): UseMutationResult<
  void, // Mutation data type
  unknown, // Error type
  IFollowerParameters // Mutation function parameter type
> {
  const queryClient = useQueryClient();
  return useMutation(deleteFollowAction, {
    onSuccess: (data, { nickname }) => {
      queryClient.setQueryData<IGetUserById | undefined>(
        ["userById", nickname],
        (oldData) =>
          oldData
            ? {
                ...oldData,
                relationStatus: FollowerStatusEnum.UNKNOWN,
              }
            : oldData
      );
    },
  });
}
