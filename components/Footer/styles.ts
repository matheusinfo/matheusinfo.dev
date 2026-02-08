import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, #000000 100%);
  border-top: 1px solid rgba(247, 187, 0, 0.1);
  padding: 50px 40px 20px;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  align-items: start;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: rgba(247, 187, 0, 0.1);
    border: 1px solid rgba(247, 187, 0, 0.3);
    border-radius: 50%;
    color: #f7bb00;
    transition: all 0.3s ease;

    &:hover {
      background: #f7bb00;
      color: #121214;
      box-shadow: 0 5px 20px rgba(247, 187, 0, 0.4);
    }
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

export const Copyright = styled.p`
  text-align: center;
  color: #575761;
  font-size: 14px;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid rgba(87, 87, 97, 0.3);
`;
