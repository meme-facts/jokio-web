import { Button } from "@components/shared/form/Button";
import { FollowerStatusEnum } from "../../../enum/FollowerStatusEnum";
import { useCreateFollowerAction } from "../../../hooks/requests/useCreateFolloweAction";
import { useDeleteFollowerAction } from "../../../hooks/requests/useDeleteFolloweAction";
import { IGetUserById } from "../../../requests/user";

interface IProfileButtonProps {
  user: IGetUserById;
}

export function ProfileButton({ user }: IProfileButtonProps) {
  const { mutateAsync: createFollowerRequest } = useCreateFollowerAction();
  const { mutateAsync: deleteFollowerRequest } = useDeleteFollowerAction();
  switch (user.relationStatus) {
    case FollowerStatusEnum.Accepted:
      return (
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
          size="xm"
        >
          Deixar de seguir
        </Button>
      );

    case FollowerStatusEnum.Blocked:
      return (
        <Button borderRadius="10px" size="xm" padding="5px" width="auto">
          Você está bloqueado
        </Button>
      );

    case FollowerStatusEnum.OWNER:
      return (
        <Button borderRadius="10px" padding="5px" width="auto" size="xm">
          Editar Perfil
        </Button>
      );

    case FollowerStatusEnum.Pending:
      return (
        <Button borderRadius="10px" size="xm" padding="5px" width="auto">
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
          size="xm"
          padding="5px"
          width="auto"
        >
          Seguir
        </Button>
      );

    default:
      return (
        <Button borderRadius="10px" size="xm" padding="5px" width="auto">
          Carregando...
        </Button>
      );
  }
}
