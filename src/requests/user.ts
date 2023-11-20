import { FollowerStatusEnum } from "../enum/FollowerStatusEnum";
import { JokioBackend } from "../services/api";

export interface IGetUserById {
  id: string;
  full_name: string | null | undefined;
  nickname: string;
  email: string;
  img_url: string | null | undefined;
  isPrivate: boolean;
  created_at: Date;
  updated_at: Date;
  followersQuantity: number;
  followingQuantity: number;
  relationStatus: FollowerStatusEnum;
}

export interface IFollowerParameters {
  id: string;
  nickname: string;
  isPrivate: boolean;
}

export async function getUserById(id: string): Promise<IGetUserById> {
  const { data } = await JokioBackend.get(`/users/${id}`);
  return data;
}

export async function createFollowAction(
  params: IFollowerParameters
): Promise<void> {
  try {
    await JokioBackend.post(`/followers/${params.id}`);
  } catch (err) {
    console.log(err);
  }
}
export async function deleteFollowAction(
  params: IFollowerParameters
): Promise<void> {
  try {
    await JokioBackend.delete(`/followers/${params.id}/unfollow`);
  } catch (err) {
    console.log(err);
  }
}
