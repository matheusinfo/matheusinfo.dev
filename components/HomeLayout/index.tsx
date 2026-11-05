import styled from "styled-components";
import { media } from "../../styles/theme";

/**
 * Split layout for the home page: sticky intro on the left, scrolling content on the right.
 * Stacks on < lg.
 */
export const HomeLayout = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.gutterMobile};

  ${media.md} {
    padding: 0 48px;
  }

  ${media.lg} {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 64px;
    padding: 0 96px;
  }
`;

export const HomeLeft = styled.header`
  padding: 64px 0 48px;

  ${media.md} {
    padding: 96px 0 64px;
  }

  ${media.lg} {
    position: sticky;
    top: 0;
    height: 100vh;
    max-height: 100vh;
    padding: 96px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const HomeRight = styled.main`
  ${media.lg} {
    padding: 96px 0;
  }
`;
