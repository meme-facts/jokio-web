import { HStack } from "@components/shared/flex/Stacks";
import { H6 } from "@components/shared/text/Heading";

export function NoPublicationsYet() {
  return (
    <HStack alignItems="center" minWidth="720px" justifyContent="center">
      <H6>Este usuário ainda não publicou nenhum meme :(</H6>
    </HStack>
  );
}
