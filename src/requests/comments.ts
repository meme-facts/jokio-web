import { JokioBackend } from "../services/api";

export type Comment = {
    message: string;
    id: string;
    userId: string;
    created_at: Date;
    updated_at: Date;
};
export interface ICommentPostParam {
    message: string;
    postId: string;
  }

export interface IGetAllCommentsByPostIdParams {
    pageParam: number;
    limit: number;
    postId: string;
}

export const getCommentsByPostId = async ({
    pageParam = 0,
    limit = 10,
    postId,
}: IGetAllCommentsByPostIdParams) => {
    const { data } = await JokioBackend.get(`/comments/${postId}`, {
        params: {
            page: pageParam,
            limit,
        },
    });
    return { ...data, prevPage: pageParam };
};

export async function createComment(params: { postId: string; message: string }) {
    const { data } = await JokioBackend.post(`/comments/${params.postId}`, {
        message: params.message,
    });
    return data;
}