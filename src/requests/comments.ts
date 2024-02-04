import { UserCredential } from "firebase/auth";
import { JokioBackend } from "../services/api";

export type Comments = {
  created_at: Date;
  id: string;
  img_url: string;
  isActive: boolean;
  postDescription: string;
  likedByLoggedUser: boolean;
  message: string;
  userId: string;
};
export interface IGetAllCommentsParams {
  pageParam: number;
  limit: number;
  postId: string;
}

export async function getComments({
  pageParam = 0,
  limit = 10,
  postId,
}: IGetAllCommentsParams) {
  const { data } = await JokioBackend.get(`/comments/${postId}`, {
    params: { page: pageParam, limit },
  });
  return { ...data, prevPage: pageParam };
}
