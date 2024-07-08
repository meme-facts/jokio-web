// import React, { Fragment, useCallback, useEffect, useState } from "react";

import UserPhoto from "@components/UserPhoto";
import Icon from "@components/shared/Icon";
import { VStack } from "@components/shared/flex/Stacks";
import { P, XP } from "@components/shared/text/Paragraph";
import ModalPost from "@components/utils/Modal/Modal";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Fragment, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { VscSend } from "react-icons/vsc";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { FadeLoader } from "react-spinners";
import { useDislikePost, useLikePost } from "../../hooks/requests/usePosts";
import { Posts as RequestPosts, getPosts } from "../../requests/posts";
import { getCommentsByPostId } from "../../requests/comments";
import {
  BackdropPhoto,
  Comment,
  CommentPosts,
  CommentsContainer,
  CommentsContainerMobile,
  ContainerPosts,
  InputComment,
  Nickname,
  ParagraphComments,
  Post,
  ReactionsContainer,
  Reloader,
  Tags,
  TagsPost,
  UserContainer,
  UserInfo,
} from "./styles";
import SwipeableEdgeDrawer from "@components/utils/DrawerComment";
import { useGetAllPostComments } from "../../hooks/requests/usePostComments";
import Comments from "@components/Comments";
// import { postLiked } from "../../requests/posts";

const Posts = () => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [dataModal, setDataModal] = useState<any>({});
  const [loveReaction, setShowReaction] = useState(false);
  const [isBackdrop, setIsBackdrop] = useState<any>();
  const [clickCount, setClickCount] = useState(1);
  const params = { page: 1, limit: 10 };

  // const { datas, isError, isLoading } = useGetAllPostComments(params);

  const { mutateAsync: createLike } = useLikePost();
  const { mutateAsync: deleteLike } = useDislikePost();
  const { ref, inView } = useInView();
  const [openDrawer, setOpenDrawer] = useState<{ [postId: string]: boolean }>(
    {}
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<
    any,
    unknown,
    { posts: RequestPosts[]; count: number; prevPage: number }
  >({
    queryKey: ["postsByUserId"],
    queryFn: ({ pageParam = 1 }) => getPosts({ pageParam, limit: 6 }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.prevPage * 6 + 1 > lastPage.count) {
        return false;
      }
      return lastPage.prevPage + 1;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const toggleModal = (post: any) => {
    setDataModal(post);
    console.log("postt", post);
    setOpenCommentModal(!openCommentModal);
  };
  const toggleDrawer = (postId: string) => {
    setOpenDrawer((prevOpenDrawer) => ({
      ...prevOpenDrawer,
      [postId]: !prevOpenDrawer[postId],
    }));
  };
  const handleCloseModal = () => {
    setOpenCommentModal(!openCommentModal);
  };
  useEffect(() => {
    setIsBackdrop(window.innerWidth);

    if (typeof window !== "undefined") {
      // Access the window object here
      const handleResize = () => {
        const width = window.innerWidth >= 1400;
        setIsBackdrop(width);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const toggleReactionPost = () => {
    setClickCount(clickCount + 1);
    if (clickCount === 2) {
      setShowReaction(true);
      setClickCount(1);
    }
  };

  const posts = (data?.pages || []).reduce<RequestPosts[]>(
    (acc, next) => [...acc, ...next.posts],
    []
  );
  return (
    <VStack>
      {posts.map((post, index) => {
        return (
          <Fragment key={post.id}>
            <ContainerPosts>
              <UserPhoto />
              {isBackdrop >= 1400 ? (
                <BackdropPhoto>
                  <Post
                    key={index}
                    alt=""
                    onClick={toggleReactionPost}
                    src={post.img_url}
                  />
                </BackdropPhoto>
              ) : (
                <Post
                  key={index}
                  alt=""
                  onClick={toggleReactionPost}
                  src={post.img_url}
                />
              )}
            </ContainerPosts>
            <div style={{ marginLeft: "52px" }}>
              <ReactionsContainer>
                {post.likedByLoggedUser ? (
                  <AiFillHeart
                    color="red"
                    onClick={() =>
                      deleteLike({
                        page: params.page,
                        limit: params.limit,
                        postId: post.id,
                      })
                    }
                  />
                ) : (
                  <AiOutlineHeart
                    color="inherit"
                    onClick={() =>
                      createLike({
                        page: params.page,
                        limit: params.limit,
                        postId: post.id,
                      })
                    }
                  />
                )}
                <BsChatLeftText
                  onClick={() =>
                    window.innerWidth >= 750
                      ? toggleModal(post)
                      : toggleDrawer(post.id)
                  }
                  height={"0.7em"}
                />
                <VscSend />
              </ReactionsContainer>
              <div ref={ref}>
                <P>{post.postDescription}</P>
              </div>
              <TagsPost>
                <P>#meme</P>
                <P>#legal</P>
                <P>#dahora</P>
                <P>#euCurtiPakas</P>
                <P>#legal</P>
              </TagsPost>
              <SwipeableEdgeDrawer
                title="Comentários"
                opened={openDrawer[post.id]}
              >
                <CommentsContainerMobile>
                  <div id="commentUser">
                    <UserPhoto size="8px" />
                    <InputComment
                      style={{ width: "70%" }}
                      type="text"
                      placeholder="Adicionar comentário"
                    />
                  </div>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div id="commentUsers">
                      <div style={{ display: "grid" }}>
                        <UserPhoto size="8px" />
                        <ParagraphComments>@amigo</ParagraphComments>
                      </div>
                      <div style={{ display: "grid", gap: 5 }}>
                        <p className="timeComment">8 min</p>
                        <Comment>Comentário teste</Comment>
                      </div>
                    </div>
                  ))}
                </CommentsContainerMobile>
              </SwipeableEdgeDrawer>
            </div>
          </Fragment>
        );
      })}

      <ModalPost onClosed={handleCloseModal} opened={openCommentModal}>
        <Comments dataModal={dataModal} />
      </ModalPost>

      <Reloader ref={ref}>
        <FadeLoader color="#36d7b7" loading={isFetchingNextPage} />
        <Icon
          styles={{ fontSize: "36px", color: "purple" }}
          icon={CheckCircleOutlinedIcon}
          hide={hasNextPage}
        />
      </Reloader>
    </VStack>
  );
};

export default Posts;
