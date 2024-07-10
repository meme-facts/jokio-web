import { HStack, VStack } from "@components/shared/flex/Stacks";
import { Skeleton } from "@mui/material";
import { Content, Conversation, MessageWrapper } from "./styles";

export function ConversationSkeleton() {
  return (
    <VStack width="100%">
      <Conversation>
        <Content>
          {Array.from({ length: 12 }).map((_, i) => (
            <VStack key={i}>
              {(i === 3 || i === 7) && (
                <VStack width="100px" alignSelf="center">
                  <Skeleton variant="text" />{" "}
                </VStack>
              )}

              <MessageWrapper $self={i % 2 !== 0}>
                {i % 2 === 0 && (
                  <Skeleton height="40px" width="40px" variant="circular" />
                )}

                <VStack width="100%">
                  {" "}
                  <Skeleton width="100%" variant="text" />
                  <Skeleton width="100%" variant="text" />
                </VStack>
              </MessageWrapper>
            </VStack>
          ))}
        </Content>
      </Conversation>
    </VStack>
  );
}
