import Image from "next/image";
import { styled } from "styled-components";
import User from "../../../public/no-photo.png";

interface IUserPhoto {
  size?: string;
  imgUrl?: string;
  onClick?: () => void;
  cursor?: "pointer" | "auto" | "not-allowed";
}

const PhotoDiv = styled.div<IUserPhoto>`
  width: ${(props) => props.size};
  min-width: ${(props) => props.size};
  height: ${(props) => props.size};
  cursor: ${(props) => props.cursor};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid var(--Primary-600, #652dcc);
  border-radius: 50%; /* Makes the avatar circular */
`;

const StyledImage = styled(Image)`
  object-fit: cover; /* Ensures the image covers the entire container */
`;
const UserPhoto = ({
  size = "30px",
  imgUrl,
  onClick,
  cursor = "auto",
}: IUserPhoto) => {
  return (
    <>
      <PhotoDiv cursor={cursor} onClick={onClick} size={size}>
        <StyledImage
          layout="responsive"
          src={imgUrl ?? User}
          height={90}
          width={90}
          alt=""
        />
      </PhotoDiv>
    </>
  );
};

export default UserPhoto;
