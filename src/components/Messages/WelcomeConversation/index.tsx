import { HStack } from "@components/shared/flex/Stacks";
import { P1 } from "@components/shared/text/Paragraph";
import { Container } from "./styles";

export function WelcomeConversation() {
  return (
    <Container>
      <P1>Selecione uma conversa e comece o chat. 💬</P1>
    </Container>
  );
}
