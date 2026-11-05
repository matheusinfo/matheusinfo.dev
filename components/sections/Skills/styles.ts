import styled from "styled-components";
import { media } from "../../../styles/theme";

export const Grid = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 28px;

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 32px;
    row-gap: 32px;
  }
`;

export const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
