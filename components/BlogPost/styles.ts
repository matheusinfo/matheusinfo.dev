import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 1;
  padding: 40px 20px 100px;
  min-height: calc(100vh - 80px);
`;

export const Content = styled.article`
  max-width: 750px;
  margin: 0 auto;
`;

export const BackLink = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 40px;
  
  a {
    color: #f7bb00;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      color: #ffd54f;
    }
  }
`;

export const PostHeader = styled.div`
  margin-bottom: 50px;
  text-align: center;

  h1 {
    font-size: clamp(28px, 5vw, 42px);
    line-height: 1.3;
    margin: 0 0 20px 0;
    background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 15px;
  color: #666;

  span:nth-child(2) {
    color: #f7bb00;
  }
`;

export const PostContent = styled.div`
  color: #d0d0d0;
  font-size: 17px;
  line-height: 1.8;

  h1 {
    font-size: 32px;
    color: #fff;
    margin: 40px 0 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(247, 187, 0, 0.3);
  }

  h2 {
    font-size: 26px;
    color: #f7bb00;
    margin: 35px 0 15px;
  }

  h3 {
    font-size: 20px;
    color: #fff;
    margin: 25px 0 10px;
  }

  p {
    margin: 15px 0;
  }

  li {
    margin: 8px 0;
    padding-left: 20px;
    position: relative;

    &::before {
      content: "•";
      color: #f7bb00;
      position: absolute;
      left: 0;
    }
  }

  code {
    &.inline {
      background: rgba(247, 187, 0, 0.15);
      color: #ffd54f;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: "Fira Code", "Consolas", monospace;
      font-size: 14px;
    }

    pre {
      background: #1a1a1f;
      border: 1px solid rgba(247, 187, 0, 0.2);
      border-radius: 12px;
      padding: 20px;
      overflow-x: auto;
      font-family: "Fira Code", "Consolas", monospace;
      font-size: 14px;
      line-height: 1.6;
      margin: 20px 0;
      color: #e0e0e0;

      &::-webkit-scrollbar {
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: #f7bb00;
        border-radius: 3px;
      }
    }
  }

  strong {
    color: #fff;
    font-weight: 600;
  }

  a {
    color: #f7bb00;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  br {
    display: block;
    content: "";
    margin: 10px 0;
  }
`;
