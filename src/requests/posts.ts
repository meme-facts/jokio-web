import { UserCredential } from "firebase/auth";
import { JokioBackend } from "../services/api";

export type Posts = {
  created_at: Date;
  id: string;
  img_url: string;
  isActive: boolean;
  postDescription: string;
};
export interface IGetAllPostParams {
  page: number;
  limit: number;
}
export interface IGetAllPostByUserIdParams {
  pageParam: number;
  limit: number;
  userId: string;
}
export async function getPosts(params: IGetAllPostParams) {
  const { data } = await JokioBackend.get("/post", {
    params,
  });
  return data;
}

export const getPostsByUserId = async ({
  pageParam = 0,
  limit = 10,
  userId,
}: IGetAllPostByUserIdParams) => {
  const { data } = await JokioBackend.get(`/post/${userId}`, {
    params: {
      page: pageParam,
      limit,
    },
  });
  return { ...data, prevPage: pageParam };
};
