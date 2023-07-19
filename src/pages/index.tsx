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
import { HStack, VStack } from "@components/flex/Stacks";
import { useAuthorization } from "../hooks/store/useAuthorization";
import { SvgIcon } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

function SignIn() {
  const { register, handleSubmit, control } = useForm<ILogin>();
  const { mutateAsync: login, isLoading } = useLoginMutation();
  const { setUser } = useAuthorization();
  const [error, setError] = useState(false);
  const handleSubmitLogin = useCallback(async (data: ILogin) => {
    try {
      const response = await login(data);
      setUser(response);
      router.push("./app");
    } catch (err) {
      setError(true);
    }
  }, []);
  return (
    <Container>
      <Content>
        <VStack alignItems="center" justifyContent="center" gap="30px">
          <Image src="/JOKIO.svg" alt="me" width="132" height="50" />
          <H5>Login</H5>
        </VStack>
        <VStack alignItems="center" justifyContent="center" gap="30px">
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
            size="lg"
            borderRadius="10px"
            disabled={isLoading}
            onClick={handleSubmit(handleSubmitLogin)}
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
            rightIcon={GoogleIcon}
          >
            ENTRAR COM GOOGLE
          </Button>
          <Button
            background="transparent"
            width="330px"
            borderRadius="10px"
            borderColor="#000"
            color="#000"
            rightIcon={AppleIcon}
          >
            ENTRAR COM APPLE
          </Button>
          <HStack alignItems="center" justifyContent="center" gap="10px">
            <P1>Primeira vez no Jokio?</P1>{" "}
            <Link href="./app">
              <P1 color="#7A41E0">Crie sua conta</P1>
            </Link>
          </HStack>
        </VStack>
      </Content>
    </Container>
  );
}

export default SignIn;
