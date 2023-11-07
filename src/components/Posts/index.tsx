import UserPhoto from "@components/UserPhoto";
import { P } from "@components/shared/text/Paragraph";
import { Fragment, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";
import { useGetAllPosts } from "../../hooks/requests/usePosts";
import { ContainerPosts, Post, ReactionsContainer, TagsPost } from "./styles";

const Posts = () => {
  const [loveReaction, setShowReaction] = useState(false);
  const [clickCount, setClickCount] = useState(1);
  const params = { page: 1, limit: 10 };
  const { data, isError, isLoading } = useGetAllPosts(params);

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

                  <BsChatLeftText />
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
    </>
  );
};

export default Posts;
