import { VStack } from "@components/shared/flex/Stacks";
import { Skeleton } from "@mui/material";
import { Grid, GridItem } from "./styles";

export function UserGridSkeleton() {
  return (
    <VStack paddingBottom="140px">
      <Grid>
        {Array.from(Array(9).keys()).map((_, i) => (
          <Skeleton key={i} variant="rounded" width={240} height={300} />
        ))}
      </Grid>
    </VStack>
  );
}
