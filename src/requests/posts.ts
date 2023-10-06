import { UserCredential } from "firebase/auth";
import { JokioBackend } from "../services/api";

export type Posts = {
    created_at: Date
    id: string
    img_url: string
    isActive: boolean
    postDescription: string
}
interface IGetAllPostParams {
    page: number;
    limit: number;
}
export async function getAllPosts(params: IGetAllPostParams) {
    const { data } = await JokioBackend.get('/post', {
        params
    })
    return data
}