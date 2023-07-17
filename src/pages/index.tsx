import { Button } from "@components/form/Button";
import { Input } from "@components/form/Input";
import Link from "next/link";
import router from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../hooks/requests/useMutationLogin";
import { ILogin } from "../requests/login";
import { Container, Content } from "./styles";
import { P1 } from "@components/text/Paragraph";
import { H5 } from "@components/text/Heading";
import Image from "next/image";
import InlineText from "@components/text/InlineText";
import HStack from "@components/flex/Stacks";
import { useAuthorization } from "../hooks/store/useAuthorization";

function SignIn() {
  const { register, handleSubmit, control } = useForm<ILogin>();
  const { mutateAsync: login, isLoading } = useLoginMutation();
  const { setUser } = useAuthorization();
  const [error, setError] = useState(false);
  const handleSubmitCreateJob = useCallback(async (data: ILogin) => {
    try {
      const response = await login(data);
      console.log(response);
      setUser(response);
      router.push("./app");
    } catch (err) {
      setError(true);
    }
  }, []);

  return (
    <Container>
      <Content>
        <Image src="/JOKIO.png" alt="me" width="132" height="32" />
        <H5>Login</H5>
        {/* <h1>Login</h1> */}
        <Input
          label="Usuário"
          placeholder="Usuário"
          control={control}
          register={register("login")}
        />
        <Input
          type="password"
          label="Sua Senha"
          placeholder="Senha"
          control={control}
          register={register("password")}
        />
        {error && <P1 color="red">wrong user or password</P1>}
        <Button
          width="330px"
          height="52px"
          borderRadius="10px"
          disabled={isLoading}
          onClick={handleSubmit(handleSubmitCreateJob)}
        >
          ENTRAR
        </Button>
        <InlineText>Ou</InlineText>
        <Button
          background="transparent"
          width="330px"
          height="44px"
          borderRadius="10px"
          borderColor="#000"
          color="#000"
        >
          ENTRAR COM GOOGLE
        </Button>
        <Button
          background="transparent"
          width="330px"
          height="44px"
          borderRadius="10px"
          borderColor="#000"
          color="#000"
        >
          ENTRAR COM APPLE
        </Button>
        <HStack gap="10px">
          <P1>Primeira vez no Jokio?</P1>{" "}
          <Link href="./app">
            <P1 color="#7A41E0">Crie sua conta</P1>
          </Link>
        </HStack>
      </Content>
    </Container>
  );
}

export default SignIn;
