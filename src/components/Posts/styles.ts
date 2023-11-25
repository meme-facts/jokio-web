import styled from "@emotion/styled";

export const ContainerPosts = styled.div<{ isOnModal?: boolean }>`
  display: ${({ isOnModal }) => (isOnModal ? "contents" : "flex")};
  gap: 10px;
  margin-top: 20px;
`;

export const BackdropPhoto = styled.div`
  background-color: black;
  width: 100%;
  justify-content: center;
  display: flex;
  border-radius: 11px;
  border: 1px solid #7a41e0;
`;

export const Reloader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding: 20px;
`;

export const Post = styled.img<{ isOnModal?: boolean }>`
  width: 83%;
  margin: ${({ isOnModal }) => (isOnModal ? "22px" : "")};
  border-radius: 11px;
  border: 1px solid #7a41e0;
  max-width: 40rem;
  @media (min-width: 1400px) {
    border-radius: 0px;
    border: none;
  }
`;

export const ReactionsContainer = styled.div`
  font-size: 22px;
  gap: 17px;
  display: flex;
  cursor: pointer;
  padding: 10px;
  align-items: center;
`;
export const TagsPost = styled.div`
  display: flex;
  margin: 10px;
  color: inherit;
  gap: 10px;
`;
export const UserInfo = styled.div`
  display: grid;
  height: fit-content;
  padding-top: 2px;
  padding-left: 15px;
  gap: 4px;
`;
export const Nickname = styled.span`
  font-weight: 700;
`;
export const Comment = styled.span``;
export const Tags = styled.div`
  display: flex;
  gap: 9px;
  color: #2f80ed;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 1.25px;
`;
export const UserContainer = styled.div`
  display: flex;
`;
export const CommentsContainer = styled.div`
  display: grid;
  width: 100%;
  margin-top: 22px;
  margin-bottom: 40px;
  gap: 20px;
  height: 89%;
  max-height: 89%;
`;
export const CommentPosts = styled.div`
  display: grid;
  gap: 20px;
  height: 90%;
  max-height: 90%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #11151a;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;
export const InputComment = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #7a41e0;
  color: white;
  height: 25px;
  outline: none;
`;
