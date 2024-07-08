import UserPhoto from "@components/UserPhoto";
import { usePostComment } from "@hooks/requests/usePostComments";
import {
  Comment as CommentType,
  getCommentsByPostId
} from "@requests/comments";
import { Posts } from "@requests/posts";
import { UserEntity } from "@requests/user";
import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import {
  Comment,
  CommentPosts,
  CommentsContainer,
  ContainerPosts,
  InputComment,
  Nickname,
  Post,
  Tags,
  UserContainer,
  UserInfo,
} from "./style";
import { Button } from "@components/shared/form/Button";

interface IComments extends Posts {
  users: UserEntity;
}

const Comments: React.FC<{ dataModal: IComments }> = ({ dataModal }) => {
  const [comment, setComment] = useState('');
  const { mutateAsync: postComment } = usePostComment();
  const [localComments, setLocalComments] = useState<any[]>([]);

  const {
    data: commentData,
  
  } = useInfiniteQuery<
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
  const handlePostComment = async () => {
    if (comment.trim()) {
      const newComment = { message: comment, userId: dataModal.users.id };
      await postComment({ postId: dataModal.id, message: comment });
      setLocalComments([...localComments, newComment]);
      setComment(''); 
    }
  };

  return (
    <>
      <ContainerPosts isOnModal={true}>
        <Post isOnModal={true} alt="" src={dataModal.img_url} />
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
        {[...comments, ...localComments].map((comment, i) => {
            return (
              <UserContainer key={i}>
                <UserPhoto />
                <UserInfo>
                  <Comment>{comment.message}</Comment>
                </UserInfo>
              </UserContainer>
            );
          })}
        </CommentPosts>
        <UserContainer>
          <UserPhoto />
          <UserInfo>
          <InputComment
              type="text"
              placeholder="Adicionar comentário"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={handlePostComment}>Enviar</Button>
          </UserInfo>
        </UserContainer>
      </CommentsContainer>
    </>
  );
};

export default Comments;
