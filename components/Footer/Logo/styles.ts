import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  p {
    color: #a0a0a0;
    font-size: 14px;
    margin: 0;
  }

  @media (max-width: 600px) {
    align-items: center;
  }
`;

export const BrandName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;

  span {
    color: #f7bb00;
    margin-left: 5px;
  }
`;
