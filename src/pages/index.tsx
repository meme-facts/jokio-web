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

function SignIn() {
  const { register, handleSubmit, control } = useForm<ILogin>();
  const { mutateAsync: login, isLoading } = useLoginMutation();
  const [error, setError] = useState(false);
  const handleSubmitCreateJob = useCallback(async (data: ILogin) => {
    try {
      const response = await login(data);
      console.log(response);
      setError(false);
      router.push("./app");
    } catch (err) {
      setError(true);
    }
  }, []);

  return (
    <Container>
      <Content>
        {/* <h1>Login</h1> */}
        <Input
          label="Usuário"
          placeholder="login"
          control={control}
          register={register("login")}
        />
        <Input
          type="password"
          label="Sua Senha"
          placeholder="password"
          control={control}
          register={register("password")}
        />
        {error && <P1>wrong user or password</P1>}
        <Button
          disabled={isLoading}
          onClick={handleSubmit(handleSubmitCreateJob)}
        >
          Login
        </Button>
        {/* <span className="text-indigo-600 italic cursor-pointer">
        <Link href="/app">Go home</Link>
      </span> */}
      </Content>
    </Container>
  );
}

export default SignIn;
