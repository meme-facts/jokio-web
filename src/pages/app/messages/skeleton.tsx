import { HStack, VStack } from "@components/shared/flex/Stacks";
import { ConversationItem } from "./styles";
import { Skeleton } from "@mui/material";

export function MessagesSkeleton() {
  return Array.from({ length: 9 }).map((_, i) => (
    <ConversationItem key={i}>
      <HStack alignItems="center" width="100%" gap="5px">
        <Skeleton variant="circular" width="50px" height="50px" />
        <VStack width="100%">
          <Skeleton width="100%" variant="text" />
          <Skeleton width="70%" variant="text" />
        </VStack>
      </HStack>
    </ConversationItem>
  ));
}
