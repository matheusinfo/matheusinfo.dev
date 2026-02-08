import styled from "styled-components";

export const LinkWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #a0a0a0;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.2px;
  padding: 8px 0;
  transition: all 0.3s ease;

  .icon {
    display: flex;
    align-items: center;
    color: #f7bb00;
  }

  &:hover {
    color: #f7bb00;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;
