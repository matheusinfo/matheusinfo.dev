import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 1;
  padding: 60px 20px 100px;
  min-height: calc(100vh - 80px);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h1`
  font-size: clamp(32px, 5vw, 48px);
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #f7bb00 0%, #ffd54f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

export const PostCard = styled.a`
  display: block;
  background: linear-gradient(
    135deg,
    rgba(59, 59, 59, 0.6) 0%,
    rgba(40, 40, 40, 0.8) 100%
  );
  padding: 30px;
  border-radius: 16px;
  border: 1px solid rgba(247, 187, 0, 0.15);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  h2 {
    color: #fff;
    font-size: clamp(18px, 3vw, 22px);
    margin: 0 0 15px 0;
    line-height: 1.4;
    transition: color 0.3s ease;
  }

  p {
    color: #a0a0a0;
    font-size: 16px;
    line-height: 1.6;
    margin: 0 0 20px 0;
  }

  &:hover {
    border-color: rgba(247, 187, 0, 0.5);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

    h2 {
      color: #f7bb00;
    }
  }
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666;

  span:nth-child(2) {
    color: #f7bb00;
  }
`;
