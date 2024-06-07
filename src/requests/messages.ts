import { JokioBackend } from "../services/api";
import { UserEntity } from "./user";

export interface MessagesEntity {
  id: string;
  message: string;
  isRead: boolean;
  fromUserId: string;
  toUserId: string;
  created_at: Date;
  fromUser: UserEntity;
}

export interface IAllMessages {
  id: string;
  message: string;
  isRead: boolean;
  fromUserId: string;
  toUserId: string;
  created_at: Date;
  chattingWith: UserEntity;
}

export interface IGetAllPostByUserIdParams {
  pageParam: number;
  limit: number;
  userId: string;
}

export async function getAllMessages(): Promise<IAllMessages[]> {
  const { data } = await JokioBackend.get("/messages");
  return data;
}

export async function getConversation({
  pageParam = 0,
  limit = 10,
  userId,
}: IGetAllPostByUserIdParams): Promise<{
  count: number;
  messagesBetweenUsers: MessagesEntity[];
  prevPage: number;
}> {
  console.log(pageParam, "pageParam");

  const { data } = await JokioBackend.get(`/messages/${userId}`, {
    params: {
      offset: pageParam,
      limit,
    },
  });
  return { ...data, offset: pageParam };
}
