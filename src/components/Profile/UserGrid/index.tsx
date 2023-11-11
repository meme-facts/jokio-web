import { useUserPosts } from "../../../hooks/requests/useUserPosts";
import { useAuthorization } from "../../../hooks/store/useAuthorization";
import { Grid, GridItem, Photo } from "./styles";

export function UserGrid() {
  const { user } = useAuthorization();
  const params = { page: 1, limit: 10 };
  const { data } = useUserPosts(params, user?.id ?? "");
  return (
    <Grid>
      {data?.posts.map((post) => (
        <GridItem key={post.id}>
          <Photo src={post.img_url} />
        </GridItem>
      ))}
    </Grid>
  );
}
