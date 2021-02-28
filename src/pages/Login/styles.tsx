import styled from "styled-components";

export const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
`;

export const Formulary = styled.form`
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  height: 550px;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 7px gray;
  margin: 30px 0px !important;


  div {
    margin-top:20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    input {
      width: 500px;
      height: 30px;
      margin-top: 40px;
      padding-left: 20px;
      font-size: 18px;
      border-radius: 20px;
      outline: 0;
    }

    input::placeholder {
    }
  }
`;

export const ButtonSend = styled.button`
  background-color: orange;
  width: 530px;
  border: none;
  height: 35px;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  outline: 0;
  margin-top:10px;

  &:hover {
    background-color:#d6a724;
  }
`;
