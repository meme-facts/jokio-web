import UserPhoto from "@components/UserPhoto";
import { usePostComment } from "@hooks/requests/usePostComments";
import {
  Comment as CommentType,
  getCommentsByPostId,
} from "@requests/comments";
import { Posts } from "@requests/posts";
import { UserEntity } from "@requests/user";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import {
  Comment,
  CommentPosts,
  CommentsContainer,
  Composer,
  ContainerPosts,
  InputComment,
  Layout,
  Nickname,
  Post,
  Tags,
  UserContainer,
  UserInfo,
} from "./style";
import { Button } from "@components/shared/form/Button";
import { useUserById } from "@hooks/requests/useUserById";

interface IComments extends Posts {
  users: UserEntity;
}

const Comments: React.FC<{ dataModal: IComments }> = ({ dataModal }) => {
  const [comment, setComment] = useState("");
  const { mutateAsync: postComment } = usePostComment();
  const [localComments, setLocalComments] = useState<any[]>([]);
  const MAX_HEIGHT = 160; // ajuste

  // dentro do seu componente Comments:
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    const h = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = h + "px";
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }, [comment]);
  const { data: commentData } = useInfiniteQuery<
    any,
    unknown,
    {
      comments: CommentType[];
      count: number;
      prevPage: number;
    }
  >({
    queryKey: ["commentsByPostId"],
    queryFn: ({ pageParam = 1 }) =>
      getCommentsByPostId({ pageParam, limit: 6, postId: dataModal.id }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.prevPage * 6 + 1 > lastPage.count) {
        return false;
      }
      return lastPage.prevPage + 1;
    },
  });

  const comments = (commentData?.pages || []).reduce<CommentType[]>(
    (acc, next) => [...acc, ...next.comments],
    []
  );
  console.log("Comments -> ", comments);
  const handlePostComment = async () => {
    if (comment.trim()) {
      const newComment = { message: comment, userId: dataModal.users.id };
      await postComment({ postId: dataModal.id, message: comment });
      setLocalComments([...localComments, newComment]);
      setComment("");
    }
  };

  return (
    <Layout>
      <ContainerPosts>
        <Post alt="" src={dataModal.img_url} />
      </ContainerPosts>

      <CommentsContainer>
        <UserContainer>
          <UserPhoto />
          <UserInfo>
            <Nickname>@{dataModal.users?.nickname}</Nickname>
            <Comment>{dataModal.postDescription}</Comment>
            <Tags>
              <span>#meme</span>
              <span>#postnovo</span>
            </Tags>
          </UserInfo>
        </UserContainer>

        <CommentPosts>
          {[...comments, ...localComments].map((comment, i) => (
            <CommentItem key={i} comment={comment} />
          ))}
        </CommentPosts>

        <Composer>
          <UserPhoto />
          <UserInfo>
            <InputComment
              ref={taRef}
              placeholder="Adicionar comentário"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={1}
            />
            <Button onClick={handlePostComment}>Enviar</Button>
          </UserInfo>
        </Composer>
      </CommentsContainer>
    </Layout>
  );
};

export default Comments;

const CommentItem: React.FC<{ comment: CommentType | any }> = ({ comment }) => {
  const { data: userData } = useUserById(comment.userId);

  if (!userData) return null;

  return (
    <UserContainer>
      <UserPhoto imgUrl={userData.photoUrl} />
      <UserInfo>
        <Nickname>@{userData.nickname}</Nickname>
        <Comment>{comment.message}</Comment>
      </UserInfo>
    </UserContainer>
  );
};
