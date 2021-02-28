import styled from 'styled-components';

export const InputLabel = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 2px solid #d9d9d9;
  padding-bottom: 13px;
  margin-bottom: 27px !important;

  span {
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
`;