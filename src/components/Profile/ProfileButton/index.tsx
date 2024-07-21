import { Button } from "@components/shared/form/Button";
import { FollowerStatusEnum } from "../../../enums/FollowerStatusEnum";
import { useCreateFollowerAction } from "../../../hooks/requests/useCreateFolloweAction";
import { useDeleteFollowerAction } from "../../../hooks/requests/useDeleteFolloweAction";
import { IGetUserById } from "../../../requests/user";
import { useState } from "react";
import { EditUserModal } from "../EditUser";
import { Div, HStack, VStack } from "@components/shared/flex/Stacks";
import { useRouter } from "next/router";
import { colors } from "../../../styles/colors";

interface IProfileButtonProps {
  user: IGetUserById;
}

export function ProfileButton({ user }: IProfileButtonProps) {
  const router = useRouter();
  const { mutateAsync: createFollowerRequest } = useCreateFollowerAction();
  const { mutateAsync: deleteFollowerRequest } = useDeleteFollowerAction();
  const [isOpen, setIsOpen] = useState(false);
  switch (user.relationStatus) {
    case FollowerStatusEnum.Accepted:
      return (
        <VStack width="100%" gap="10px">
          <Button
            onClick={() =>
              deleteFollowerRequest({
                id: user.id,
                nickname: user.nickname,
                isPrivate: user.isPrivate,
              })
            }
            borderRadius="10px"
            padding="5px"
            width="auto"
            size="sm"
            border="none"
          >
            Deixar de seguir
          </Button>
          <Button
            onClick={() =>
              router.push({
                pathname: "/app/messages",
                query: { user: user.nickname },
              })
            }
            borderRadius="10px"
            padding="5px"
            width="auto"
            size="sm"
            backgroundColor={colors.gray[600]}
            border="none"
          >
            Enviar Mensagem
          </Button>
        </VStack>
      );

    case FollowerStatusEnum.Blocked:
      return (
        <Button borderRadius="10px" size="sm" padding="5px" width="100%">
          Você está bloqueado
        </Button>
      );

    case FollowerStatusEnum.OWNER:
      return (
        <Div width="100%">
          <Button
            onClick={() => setIsOpen(true)}
            borderRadius="10px"
            padding="5px"
            size="sm"
          >
            Editar Perfil
          </Button>
          <EditUserModal
            defaultValues={{
              email: user.email,
              img_url: user.img_full_url,
              full_name: user.full_name ?? "",
              nickname: user.nickname,
            }}
            isOpen={isOpen}
            handleCloseModal={() => setIsOpen(false)}
          />
        </Div>
      );

    case FollowerStatusEnum.Pending:
      return (
        <Button borderRadius="10px" size="sm" padding="5px" width="100%">
          Pendente
        </Button>
      );

    case FollowerStatusEnum.UNKNOWN:
      return (
        <Button
          onClick={() =>
            createFollowerRequest({
              id: user.id,
              nickname: user.nickname,
              isPrivate: user.isPrivate,
            })
          }
          borderRadius="10px"
          size="sm"
          padding="5px"
          width="100%"
        >
          Seguir
        </Button>
      );

    default:
      return (
        <Button borderRadius="10px" size="sm" padding="5px" width="100%">
          Carregando...
        </Button>
      );
  }
}
