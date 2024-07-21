import { HStack, VStack } from "@components/shared/flex/Stacks";
import { Skeleton } from "@mui/material";

export function NewConversationModalSkeleton() {
  return (
    <VStack width="100%" padding="25px" gap="10px">
      <HStack justifyContent="space-between">
        <Skeleton width={50} variant="text" />
        <Skeleton width={24} variant="circular" />
      </HStack>
      <Skeleton width="100%" variant="rectangular" />
      <VStack maxHeight="100%" overflow="auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <HStack key={i} padding="10px" gap="10px" alignItems="center">
            <Skeleton width={50} height={50} variant="circular" />
            <VStack gap="2px">
              <Skeleton width={50} variant="text" />
              <Skeleton width={70} variant="text" />
            </VStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}
