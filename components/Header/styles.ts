import styled from "styled-components";

type Props = {
  active: boolean;
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  height: 80px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(247, 187, 0, 0.1);

  @media (max-width: 799px) {
    display: none;
  }
`;

export const Logo = styled.div`
  a {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(135deg, #f7bb00 0%, #ffd54f 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-decoration: none;
    letter-spacing: 2px;
  }
`;

export const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const HyperLink = styled.a<Props>`
  position: relative;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: ${(props) => (props.active ? "#f7bb00" : "#fff")};
  padding: 8px 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background: linear-gradient(90deg, #f7bb00, #ffd54f);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #f7bb00;
    
    &::after {
      width: 100%;
    }
  }
`;
