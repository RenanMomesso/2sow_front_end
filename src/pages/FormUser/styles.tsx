import styled from "styled-components";

export const FormUserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  width: 100%;
  background: -webkit-linear-gradient(45deg, #d49a4f, #62a16f);
`;

export const NewUserFormulary = styled.div`
  width: 500px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 42px 55px 45px;
  margin-top: 20px;

  form {
    width: 100%;

    span {
      display: block;
      font-family: Poppins-Bold;
      font-size: 39px;
      color: #333;
      line-height: 1.2;
      text-align: center;
      padding-bottom: 44px;
    }
    div {
      width: 100%;
      position: relative;
      border-bottom: 2px solid #d9d9d9;
      padding-bottom: 3px;
      margin-bottom: 27px !important;

      label {
        font-family: Poppins-Regular;
        font-size: 14px !important;
        color: #666;
        line-height: 1.5;
        padding-left: 5px;
      }

      input {
        display: block;
        width: 100%;
        background: 0 0;
        font-family: Poppins-Medium;
        font-size: 18px;
        color: #333;
        line-height: 1.1;
        padding: 2px 5px;
        border: none;
        margin-top: 10px;
        outline: none;
      }

      
    }
  }
  .error-warning {
      padding:2px;
      color:red;
      border-radius:8px;
      margin-top:10px !important;
      position:absolute;
  }
`;

export const ButtonSubmit = styled.button`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  outline: none;
  border: none;
  background-color: #fff;
  margin-bottom: 50px;
  cursor: pointer;

  div {
    width: 100%;
    display: block;
    position: relative;
    z-index: 1;
    border-radius: 25px;
    overflow: hidden;
    margin: 0 auto;
    background: -webkit-linear-gradient(45deg, #d49a4f, #62a16f);

   
      p {
          color:white !important;
          font-size:17px;
          font-weight:bold;

    }
  }
`;
