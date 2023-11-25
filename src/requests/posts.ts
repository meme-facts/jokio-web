import { UserCredential } from "firebase/auth";
import { JokioBackend } from "../services/api";

export type Posts = {
  created_at: Date;
  id: string;
  img_url: string;
  isActive: boolean;
  postDescription: string;
  likedByLoggedUser: boolean;
};
export interface IGetAllPostParams {
  pageParam: number;
  limit: number;
}
export interface ILikePostsParam {
  page: number;
  limit: number;
  postId: string;
}
export async function getPosts({ pageParam = 0, limit }: IGetAllPostParams) {
  const { data } = await JokioBackend.get("/post", {
    params: { page: pageParam, limit },
  });
  return { ...data, prevPage: pageParam };
}

export async function getPostsByUserId(
  params: IGetAllPostParams,
  userId: string
) {
  const { data } = await JokioBackend.get(`/post/${userId}`, {
    params,
  });
  return data;
}
export async function createLikePost(params: ILikePostsParam) {
  const { data } = await JokioBackend.post(`/like/${params.postId}`);
  return data;
}
export async function deleteLikePost(params: ILikePostsParam) {
  const { data } = await JokioBackend.delete(`/like/${params.postId}`);
  return data;
}
