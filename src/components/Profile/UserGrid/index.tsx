import Icon from "@components/shared/Icon";
import { VStack } from "@components/shared/flex/Stacks";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { FadeLoader } from "react-spinners";
import { Posts, getPostsByUserId } from "../../../requests/posts";
import { UserGridSkeleton } from "./skeleton";
import { Grid, GridItem, Photo, Reloader } from "./styles";

export function UserGrid() {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { nickname } = router.query;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    any,
    unknown,
    { posts: Posts[]; count: number; prevPage: number }
  >({
    queryKey: ["postsByUserId"],
    queryFn: ({ pageParam = 1 }) =>
      getPostsByUserId({ pageParam, limit: 9, userId: nickname as string }),
    getNextPageParam: (lastPage) => {
      if (lastPage.prevPage * 9 + 1 > lastPage.count) {
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

  const posts = (data?.pages || []).reduce<Posts[]>(
    (acc, next) => [...acc, ...next.posts],
    []
  );
  if (isLoading) {
    return <UserGridSkeleton />;
  }
  return (
    <VStack paddingBottom="140px">
      <Grid>
        {posts.map((post) => (
          <GridItem key={post.id}>
            <Photo src={post.img_url} />
          </GridItem>
        ))}
      </Grid>

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
}
