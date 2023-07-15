import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { login } from "../../requests/login";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries("login");
    },
  });
}
