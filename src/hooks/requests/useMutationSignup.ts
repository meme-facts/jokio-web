import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { signup } from "../../requests/signup";

export function useSignupMutation() {
  const queryClient = useQueryClient();
  return useMutation(signup, {
    onSuccess: () => {
      queryClient.invalidateQueries("signup");
    },
  });
}
