import Image from "next/image";
import { styled } from "styled-components";
import User1 from '../../../public/user1.jpeg'
const PhotoForm = styled.div`
display: flex;
width: 6px;
justify-content: center;
height: 6px;
border-radius: 50%;
background-color: green;
overflow: hidden;
border: 2px solid var(--Primary-600, #652DCC);
padding: 15px;
align-items: center; 
`
const UserPhoto = () => {
    return (
        <>
            <PhotoForm>
                <Image src={User1} height={100} alt="" />
            </PhotoForm>
        </>);
}

export default UserPhoto;