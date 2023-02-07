import styled from "styled-components";

export const Container = styled.div`
  z-index: 1;
  position: relative;
  height: 150px;
  margin-top: 50px;
  width: 100%;
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
`;

export const LinkCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.a`
  color: #fff;
  font-weight: bold;
  border: 0;
  font-size: 22px;
  width: 600px;
  height: 70px;
  letter-spacing: 0.2px;
  margin-top: 25px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  background-color: #f7bb00;

  :hover {
    text-decoration: underline;
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    width: 400px;
    height: 50px;
  }
`;

