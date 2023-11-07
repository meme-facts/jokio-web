import Image from "next/image";
import { styled } from "styled-components";
import User1 from "../../../public/user1.jpeg";

interface IUserPhoto {
  size?: string;
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
const UserPhoto = ({ size = "6px" }: IUserPhoto) => {
  return (
    <>
      <PhotoForm size={size}>
        <Image src={User1} height={100} alt="" />
      </PhotoForm>
    </>
  );
};

export default UserPhoto;
