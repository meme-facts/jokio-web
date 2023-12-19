import { VStack } from "@components/shared/flex/Stacks";
import { Skeleton } from "@mui/material";
import { GridUserInfo } from "./styles";

export function UserInfoSkeleton() {
  return (
    <>
      <VStack
        width="100%"
        justifyContent="start"
        alignItems="center"
        gap="10px"
      >
        <VStack
          gap="20px"
          justifyContent="start"
          alignItems="center"
          maxWidth="250px"
        >
          <VStack
            gap="5px"
            height="130px"
            justifyContent="center"
            alignItems="center"
          >
            <Skeleton variant="circular" width={90} height={90} />
            <Skeleton width={90} variant="text" sx={{ fontSize: "1rem" }} />
          </VStack>
          <GridUserInfo>
            <VStack gap="5px" justifyContent="center" alignItems="center">
              <Skeleton width={50} variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton width={70} variant="text" sx={{ fontSize: "1rem" }} />
            </VStack>
            <VStack gap="5px" justifyContent="center" alignItems="center">
              <Skeleton width={50} variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton width={70} variant="text" sx={{ fontSize: "1rem" }} />
            </VStack>
            <VStack gap="5px" justifyContent="center" alignItems="center">
              <Skeleton width={50} variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton width={70} variant="text" sx={{ fontSize: "1rem" }} />
            </VStack>
            <VStack gap="5px" justifyContent="center" alignItems="center">
              <Skeleton width={50} variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton width={70} variant="text" sx={{ fontSize: "1rem" }} />
            </VStack>
          </GridUserInfo>
          <Skeleton width={100} variant="text" sx={{ fontSize: "1.5rem" }} />
        </VStack>
      </VStack>
    </>
  );
}
