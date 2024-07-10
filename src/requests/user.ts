import { FollowerStatusEnum } from "../enums/FollowerStatusEnum";
import { JokioBackend } from "../services/api";

export interface UserEntity {
  id: string;
  full_name?: string | null;
  nickname: string;
  email: string;
  img_url?: string | null;
  img_full_url?: string;
  isPrivate?: boolean | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface IGetUserById {
  id: string;
  full_name: string | null | undefined;
  nickname: string;
  email: string;
  isPrivate: boolean;
  created_at: Date;
  updated_at: Date;
  img_full_url?: string;
  followersQuantity: number;
  followingQuantity: number;
  relationStatus: FollowerStatusEnum;
}

export interface IFollowerParameters {
  id: string;
  nickname: string;
  isPrivate: boolean;
}

export interface IUpdateUser {
  full_name: string;
  nickname: string;
  email: string;
  img_url: string;
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

export async function editUser(params: IUpdateUser): Promise<void> {
  try {
    const { img_url, ...rest } = params;
    await JokioBackend.put(`/users/update`, rest);
  } catch (err) {
    console.log(err);
  }
}
export async function editImg(formData: FormData): Promise<void> {
  try {
    await JokioBackend.patch(`/users/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function isEmailAvailable(email: string): Promise<Boolean> {
  const { data } = await JokioBackend.get(`/users/email/${email}/is-available`);
  return data;
}

export async function isNicknameAvailable(nickname: string): Promise<Boolean> {
  const { data } = await JokioBackend.get(
    `/users/nickname/${nickname}/is-available`
  );

  return data;
}
