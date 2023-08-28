import { Button } from "@components/form/Button";
import { Input } from "@components/form/Input";
import Link from "next/link";
import router from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../hooks/requests/useMutationSignup";
import { ISignup } from "../../requests/signup";
import { Container, Content } from "../styles";
import { P1 } from "@components/text/Paragraph";
import { H5 } from "@components/text/Heading";
import Image from "next/image";
import InlineText from "@components/text/InlineText";
import { HStack, VStack } from "@components/flex/Stacks";
import { useAuthorization } from "../../hooks/store/useAuthorization";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";


const Signup = () => {
    const { register, handleSubmit, control } = useForm<ISignup>();
    const { mutateAsync: signup, isLoading } = useSignupMutation();
    const { setUser } = useAuthorization();
    const [error, setError] = useState(false);
    const handleSubmitSignup = useCallback(async (data: ISignup) => {
        try {
            const response = await signup(data);
            setUser(response);
            router.push("./app");
        } catch (err) {
            setError(true);
        }
    }, []);
    return (
        <Container>
            <Content>
                <VStack alignItems="center" justifyContent="center" gap="10px">
                    <Image src="/JOKIO.svg" alt="me" width="132" height="50" />
                    <H5>Crie sua conta</H5>
                </VStack>
                <VStack alignItems="center" justifyContent="center" gap="20px">
                    <Input
                        label="Usuário"
                        placeholder="Usuário"
                        control={control}
                        register={register("nickname")}
                    />
                    <Input
                        label="Email"
                        placeholder="Email"
                        control={control}
                        register={register("email")}
                    />
                    <Input
                        type="password"
                        label="Sua Senha"
                        placeholder="Senha"
                        control={control}
                        register={register("password")}
                    />
                    {error && <P1 color="red">Wrong user or password</P1>}
                    <Button
                        width="330px"
                        size="lg"
                        borderRadius="10px"
                        disabled={isLoading}
                        onClick={handleSubmit(handleSubmitSignup)}
                    >
                        CONTINUAR
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
                    <HStack alignItems="center" justifyContent="center" marginBottom={20} gap="10px">
                        <P1>Já é usuário do Jokio?</P1>{" "}
                        <Link href={'./'} >
                            <P1 color="#7A41E0">Entrar</P1>
                        </Link>
                    </HStack>
                </VStack>
            </Content>
        </Container>
    );
}

export default Signup;