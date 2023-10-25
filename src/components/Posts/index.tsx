import React, { Fragment, useEffect, useState } from "react";

import UserPhoto from "@components/UserPhoto";

import {
  Comment,
  CommentPosts,
  CommentsContainer,
  ContainerPosts,
  InputComment,
  Nickname,
  Post,
  ReactionsContainer,
  Tags,
  TagsPost,
  UserContainer,
  UserInfo,
} from "./styles";
import { BsChatLeftText } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import { P } from "@components/shared/text/Paragraph";
import { useGetAllPosts } from "../../hooks/requests/usePosts";
import { useAuthorization } from "../../hooks/store/useAuthorization";
import ModalPost from "@components/utils/Modal/Modal";

const Posts = () => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [loveReaction, setShowReaction] = useState(false);
  const [clickCount, setClickCount] = useState(1);
  const params = { page: 1, limit: 10 };
  const { data, isError, isLoading } = useGetAllPosts(params);

  const toggleModal = (post: any) => {
    setDataModal(post);
    setOpenCommentModal(!openCommentModal);
  };
  const handleCloseModal = () => {
    setOpenCommentModal(!openCommentModal);
  };
  useEffect(() => {
    console.log(data);
  }, []);

  const toggleReactionPost = () => {
    setClickCount(clickCount + 1);
    if (clickCount === 2) {
      setShowReaction(true);
      setClickCount(1);
    }
  };
  const toggleReaction = () => {
    setShowReaction(!loveReaction);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  return (
    <>
      {data &&
        data.posts.map((post, index) => {
          return (
            <Fragment key={post.id}>
              <ContainerPosts>
                <UserPhoto />
                <Post
                  key={index}
                  alt=""
                  onClick={toggleReactionPost}
                  src={post.img_url}
                />
              </ContainerPosts>
              <div style={{ marginLeft: "52px" }}>
                <ReactionsContainer>
                  {loveReaction ? (
                    <AiFillHeart color="red" onClick={toggleReaction} />
                  ) : (
                    <AiOutlineHeart color="black" onClick={toggleReaction} />
                  )}

                  <BsChatLeftText
                    onClick={() => toggleModal(post)}
                    height={"0.8em"}
                  />
                  <VscSend />
                </ReactionsContainer>
                <div>
                  <P>{post.postDescription}</P>
                </div>
                <TagsPost>
                  <P>#meme</P>
                  <P>#legal</P>
                  <P>#dahora</P>
                  <P>#euCurtiPakas</P>
                  <P>#legal</P>
                </TagsPost>
              </div>
            </Fragment>
          );
        })}
      {openCommentModal && (
        <ModalPost onClosed={handleCloseModal} opened={openCommentModal}>
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
              {Array.from({ length: 10 }).map((_, i) => (
                <UserContainer key={i}>
                  <UserPhoto />
                  <UserInfo>
                    <Nickname>@{dataModal.users?.nickname}</Nickname>
                    <Comment>{dataModal.postDescription}</Comment>
                  </UserInfo>
                </UserContainer>
              ))}
            </CommentPosts>
            <UserContainer>
              <UserPhoto />
              <UserInfo>
                <InputComment type="text" placeholder="Adicionar comentário" />
              </UserInfo>
            </UserContainer>
          </CommentsContainer>
        </ModalPost>
      )}
    </>
  );
};
//                   <BsChatLeftText />
//                   <VscSend />
//                 </ReactionsContainer>
//                 <div>
//                   <P>{post.postDescription}</P>
//                 </div>
//                 <TagsPost>
//                   <P>#meme</P>
//                   <P>#legal</P>
//                   <P>#dahora</P>
//                   <P>#euCurtiPakas</P>
//                   <P>#legal</P>
//                 </TagsPost>
//               </div>
//             </Fragment>
//           );
//         })}
//     </>
//   );
// };

export default Posts;
