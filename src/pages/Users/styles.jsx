import styled from "styled-components";

export const ContainerAllUsers = styled.div`
background: -webkit-linear-gradient(45deg, #d49a4f, #62a16f);
height:100vh;
`;

export const ContainerTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    border: 1px solid black;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: white;
  }
`;

export const ContainerUserTable = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #d49a4f !important;
  }
`;
