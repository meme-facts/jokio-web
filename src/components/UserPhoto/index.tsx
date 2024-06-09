import Image from "next/image";
import { styled } from "styled-components";
import User from "../../../public/no-photo.png";

interface IUserPhoto {
  size?: string;
  imgUrl?: string;
}
const PhotoForm = styled.div<IUserPhoto>`
  display: flex;
  width: ${(props) => props.size};
  justify-content: center;
  height: ${(props) => props.size};
  border-radius: 50%;
  background-color: green;
  overflow: hidden;
  border: 2px solid var(--Primary-600, #652dcc);
  padding: 15px;
  align-items: center;
`;

const PhotoDiv = styled.div<IUserPhoto>`
  width: ${(props) => props.size};
  min-width: ${(props) => props.size};
  height: ${(props) => props.size};
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
const UserPhoto = ({ size = "30px", imgUrl }: IUserPhoto) => {
  console.log(imgUrl);

  return (
    <>
      <PhotoDiv size={size}>
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
