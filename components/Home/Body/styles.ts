import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  img {
    width: 425px;
    height: 425px;
  }

  strong {
    font-size: 30px;
    margin-top: 20px;

    span {
      color: #f7bb00;
    }
  }

  small {
    font-size: 12px;
    margin-top: 20px;
  }

  button {
    color: #fff;
    background-color: #f7bb00;
    height: 50px;
    width: 170px;
    margin-top: 80px;
    border: 0;
    border-radius: 22px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.5s;
    margin-bottom: 60px;
    z-index: 1;

    a {
      color: #fff;
      text-decoration: none;
    }

    :hover {
      opacity: 0.7;
    }
  }
`;
