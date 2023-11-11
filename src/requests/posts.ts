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
  page: number;
  limit: number;
}
export async function getPosts(params: IGetAllPostParams) {
  const { data } = await JokioBackend.get("/post", {
    params,
  });
  return data;
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

export async function postLiked({ params }: any) {
  const { data } = await JokioBackend.post(`like/${params}`);
  return data;
}
export async function postDisliked(params: { postId: string }) {
  const { data } = await JokioBackend.post("/dislike", params);
  return data;
}
