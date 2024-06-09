//react component receiving ref from parent

import { Button } from "@components/shared/form/Button";
import { MessagesArea } from "./styles";
import { Input } from "@components/shared/form/Input";
import { useCallback, useState } from "react";
import { MessagesEntity } from "../../../requests/messages";
import { useAuthorization } from "../../../hooks/store/useAuthorization";
import { v4 as uuidV4 } from "uuid";
import { UserEntity } from "../../../requests/user";
import { useUpdateConversationData } from "../../../hooks/requests/messages/useUpdateConversationData";
import { socket } from "../../../services/socket";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import {
  MessageFormData,
  messageFormSchema,
} from "../../../schema/messege.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { colors } from "../../../style/colors";
import { IconButton } from "@components/shared/form/IconButton";
import { Form } from "@components/shared/form/Form";
import Icon from "@components/shared/Icon";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Div } from "@components/shared/flex/Stacks";

interface TextingAreaProps {
  selectedUser: UserEntity;
  updateRef: (chattingWithId: string) => void;
}

export function TextingArea({ selectedUser, updateRef }: TextingAreaProps) {
  const { user } = useAuthorization();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const { updateData } = useUpdateConversationData();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { isDirty, isValid },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageFormSchema),
  });

  const handleSubmitMessage = useCallback(
    async (data: { message: string }) => {
      if (selectedUser && user) {
        const message: MessagesEntity = {
          id: uuidV4(),
          fromUserId: user.id,
          toUserId: selectedUser.id,
          message: data.message,
          isRead: false,
          created_at: new Date(),
          fromUser: {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
          },
        };
        updateRef(selectedUser.id);
        updateData(message, selectedUser);
        socket.emit("message", message);
        reset();
      }
    },
    [selectedUser]
  );

  function handleEmojiClick(value: EmojiClickData) {
    const currentValue = getValues("message") || "";
    const newValue = currentValue + value.emoji;
    setValue("message", newValue);
    setIsEmojiOpen(false);
  }
  return (
    <Form height="100px" onSubmit={handleSubmit(handleSubmitMessage)}>
      <MessagesArea>
        <Input
          placeholder="Digite uma mensagem"
          control={control}
          register={register("message")}
          border="none"
          borderBottom={`1px solid ${colors.purple[200]}`}
          borderRadius="0px"
          marginBottom="5px"
          paddingLeft="35px"
          height="35px"
        />

        <IconButton
          icon={SendIcon}
          isDisabled={!isDirty || !isValid}
          hide={!isDirty || !isValid}
          position="absolute"
          right="-15px"
          bottom="15px"
          iconStyles={{ color: colors.primary[400] }}
        />
        <Icon
          styles={{
            position: "absolute",
            left: "15px",
            bottom: "22px",
            cursor: "pointer",
          }}
          icon={SentimentSatisfiedAltIcon}
          onClick={() => setIsEmojiOpen((val) => !val)}
        />
        <EmojiPicker
          open={isEmojiOpen}
          onEmojiClick={handleEmojiClick}
          style={{ position: "absolute", bottom: "62px", left: "-1px" }}
        />
      </MessagesArea>
    </Form>
  );
}
