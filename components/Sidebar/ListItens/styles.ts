import styled from "styled-components";

type ActiveProps = {
  $active: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;

  strong {
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
    color: #575761;
    margin-bottom: 12px;
  }
`;

export const NavLink = styled.div<ActiveProps>`
  display: flex;
  align-items: center;
  background: ${(props) => 
    props.$active 
      ? "rgba(247, 187, 0, 0.1)" 
      : "transparent"};
  border: 1px solid ${(props) => 
    props.$active 
      ? "rgba(247, 187, 0, 0.3)" 
      : "transparent"};
  border-radius: 10px;
  padding: 12px 15px;
  color: ${(props) => (props.$active ? "#f7bb00" : "#fff")};
  transition: all 0.3s ease;
  cursor: pointer;

  svg {
    font-size: 20px;
  }

  a {
    color: ${(props) => (props.$active ? "#f7bb00" : "#fff")};
    text-decoration: none;
    font-size: 15px;
    margin-left: 12px;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  &:hover {
    background: rgba(247, 187, 0, 0.1);
    color: #f7bb00;
    
    a {
      color: #f7bb00;
    }
  }
`;
