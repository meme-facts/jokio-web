import { Button } from "@components/shared/form/Button";
import { FollowerStatusEnum } from "../../../enums/FollowerStatusEnum";
import { useCreateFollowerAction } from "../../../hooks/requests/useCreateFolloweAction";
import { useDeleteFollowerAction } from "../../../hooks/requests/useDeleteFolloweAction";
import { IGetUserById } from "../../../requests/user";
import { useState } from "react";
import { EditUserModal } from "../EditUser";

interface IProfileButtonProps {
  user: IGetUserById;
}

export function ProfileButton({ user }: IProfileButtonProps) {
  const { mutateAsync: createFollowerRequest } = useCreateFollowerAction();
  const { mutateAsync: deleteFollowerRequest } = useDeleteFollowerAction();
  const [isOpen, setIsOpen] = useState(false);
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
        <>
          <Button
            onClick={() => setIsOpen(true)}
            borderRadius="10px"
            padding="5px"
            width="auto"
            size="xm"
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
        </>
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
