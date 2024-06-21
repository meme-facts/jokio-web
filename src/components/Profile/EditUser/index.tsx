import UserPhoto from "@components/UserPhoto";
import { VStack, VStackForm } from "@components/shared/flex/Stacks";
import { Button } from "@components/shared/form/Button";
import { Input } from "@components/shared/form/Input";
import { InputFile } from "@components/shared/form/InputFile";
import Modal from "@components/utils/Modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutationEditUser } from "@hooks/requests/profile/useMutationEdit";
import { useAuthorization } from "@hooks/store/useAuthorization";
import { editImg } from "@requests/user";
import { EditUserFormData, editUserFormSchema } from "@schema/edit-user.schema";
import { useRouter } from "next/router";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

interface EditUserModalProps {
  handleCloseModal: () => void;
  isOpen: boolean;
  defaultValues: EditUserFormData;
}

const isUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export function EditUserModal({
  isOpen,
  handleCloseModal,
  defaultValues,
}: EditUserModalProps) {
  const { changeNickname } = useAuthorization();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditUserFormData>({
    defaultValues,
    resolver: zodResolver(editUserFormSchema),
  });
  const { mutateAsync: updateUser } = useMutationEditUser(
    defaultValues.nickname
  );
  const router = useRouter();
  const img = useWatch({
    control,
    name: "img_url",
  });

  const imgUrl = useMemo(() => {
    if (img) {
      if (img instanceof Blob) {
        return URL.createObjectURL(img);
      } else if (typeof img === "string" && isUrl(img)) {
        return img;
      }
    }
    return "";
  }, [img]);

  const handleSubmitEditUser = useCallback(async (data: EditUserFormData) => {
    try {
      updateUser({
        email: data.email,
        full_name: data.full_name,
        nickname: data.nickname,
        img_url:
          typeof data.img_url !== "string"
            ? URL.createObjectURL(data.img_url)
            : data.img_url,
      });
      if (!isUrl(data.img_url)) {
        const formData = new FormData();
        formData.append("avatar", data.img_url);
        await editImg(formData);
      }
      handleCloseModal();
      if (defaultValues.nickname !== data.nickname) {
        changeNickname(data.nickname);
        router.push(`/app/profile/${data?.nickname}`);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Modal
      width="500px"
      height="80%"
      onClosed={handleCloseModal}
      opened={isOpen}
    >
      <VStackForm
        onSubmit={handleSubmit(handleSubmitEditUser)}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        padding="10px 50px"
        gap="30px"
      >
        <VStack gap="5px" justifyContent="center" alignItems="center">
          {" "}
          <UserPhoto imgUrl={imgUrl} size="100px" />
          <InputFile
            width="80px"
            label="Alterar foto"
            placeholder="Usuário"
            control={control}
            register={register("img_url")}
          />
        </VStack>

        <Input
          label="Usuário"
          placeholder="Digite seu usuário"
          control={control}
          register={register("nickname")}
          error={errors.nickname?.message}
        />
        <Input
          label="Nome"
          placeholder="Digite seu nome"
          control={control}
          register={register("full_name")}
          error={errors.full_name?.message}
        />
        <Input
          label="Email"
          placeholder="Digite seu email"
          control={control}
          register={register("email")}
          error={errors.email?.message}
        />
        <Button width="330px" size="md" borderRadius="10px" disabled={false}>
          Salvar
        </Button>
      </VStackForm>
    </Modal>
  );
}
