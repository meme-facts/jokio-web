import styled from "@emotion/styled";

export const ContainerPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BackdropPhoto = styled.span`
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

export const Post = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 11px;
  border: 1px solid #7a41e0;
  object-fit: contain;

  @media (min-width: 1400px) {
    border-radius: 0;
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
  width: 100%;
  gap: 8px;
`;
export const Nickname = styled.span`
  font-weight: 700;
`;
export const Comment = styled.span`
  font-family: var(--inter-font);
`;
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
  grid-template-rows: auto 1fr auto; /* header | lista | composer */
  gap: 16px;
  max-height: 85vh;   /* ou a altura do seu modal */
  min-height: 0;
  overflow: hidden;   /* impede vazar para fora do modal */
  width: 100%;

  @media (max-width: 1024px) {
    max-height: none; /* mobile: cresce conforme a página */
  }
`;

export const CommentPosts = styled.div`
  display: grid;
  gap: 20px;
  min-height: 0;
  overflow-y: auto;   /* só a lista rola */
  padding-right: 12px;

  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background-color: transparent; }
  &::-webkit-scrollbar-thumb { background-color: #11151a; border-radius: 20px; }
  &::-webkit-scrollbar-thumb:hover { background-color: #555; }
`;

export const Composer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 8px;

`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px; /* post | coluna de comentários */
  gap: 24px;
  padding:6px;
  width: 100%;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr; /* empilha */
    gap: 16px;
  }
`;

export const InputComment = styled.textarea`
  width: 100%;
  min-height: 38px;
  max-height: 160px;
  line-height: 1.4;
  padding: 6px 0;
  background: transparent;
  color: #fff;
  border: none;
  border-bottom: 1px solid #7a41e0;
  outline: none;
  resize: none;
  overflow: hidden;     /* o JS muda para auto quando atingir o máximo */
  white-space: pre-wrap;
  overflow-wrap: anywhere;
`;

export const CommentsContainerMobile = styled.div`
  #commentUser {
    display: flex;
    gap: 15px;
  }
  #commentUsers {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    align-items: start;
    color: #fff;
  }
  .timeComment {
    font-size: 14px !important;
    opacity: 0.5 !important;
    margin: 0;
  }
`;
export const ParagraphComments = styled.p`
  font-size: 14px;
  margin: 0;
  font-family: var(--inter-font);
`;
