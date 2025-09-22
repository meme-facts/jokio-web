import Icon from "@components/shared/Icon";
import { DivTab, Tab } from "@components/shared/Tabs";
import { VStack } from "@components/shared/flex/Stacks";
import { EQueries } from "@enums/reactQueryTags/queries.enum";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { FadeLoader } from "react-spinners";
import { Posts, getPostsByUserId } from "../../../requests/posts";
import { colors } from "../../../styles/colors";
import { NoPublicationsYet } from "./NoPublicationsYet";
import { UserGridSkeleton } from "./skeleton";
import { Grid, GridItem, Photo, Reloader } from "./styles";

export function UserGrid() {
  const { query } = useRouter();
  const { ref, inView } = useInView();
  const { nickname } = query;

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
    queryKey: [EQueries.postsByUserId],
    staleTime: 1000 * 60 * 5,
    enabled: !!nickname,
    queryFn: ({ pageParam = 1 }) => {
      console.log("Fetching posts for user:", nickname);
      return getPostsByUserId({
        pageParam,
        limit: 9,
        userName: nickname as string,
      });
    },
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
  const publicationsCount = data?.pages[0].count;
  if (isLoading) {
    return <UserGridSkeleton />;
  }
  return (
    <VStack
      height="100%"
      gap="20px"
      paddingBottom="140px"
      justifyContent="center"
    >
      <DivTab>
        <Tab $active>Publicações {publicationsCount}</Tab>
      </DivTab>
      {publicationsCount === 0 ? (
        <NoPublicationsYet />
      ) : (
        <Fragment>
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
              styles={{ fontSize: "36px", color: colors.primary[500] }}
              icon={CheckCircleOutlinedIcon}
              hide={hasNextPage}
            />
          </Reloader>
        </Fragment>
      )}
    </VStack>
  );
}
