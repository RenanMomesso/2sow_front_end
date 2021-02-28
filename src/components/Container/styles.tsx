import styled from "styled-components";

export const ContainerDiv = styled.div`
`;

export const NavBar = styled.div`
    width:100%;
    display:flex;
    height:60px;
    align-items:center;
    flex-direction:row;
    justify-content:space-around;
    list-style:none;
    background-color:#F8F8F8;

    a {
        font-size:18px;
        font-weight:bolder;
        color:black;
        text-decoration:none;

        &:hover, &:active{
            color:orange;
        }
    }
`;
