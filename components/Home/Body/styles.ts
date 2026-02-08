import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
`;

export const ProfileImage = styled.div`
  position: relative;
  margin-bottom: 30px;
  animation: float 6s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    background: linear-gradient(45deg, #f7bb00, transparent, #f7bb00);
    border-radius: 50%;
    opacity: 0.3;
    filter: blur(20px);
    z-index: -1;
  }
`;

export const Title = styled.h1`
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 700;
  margin: 0 0 20px 0;
  line-height: 1.2;
  
  span {
    background: linear-gradient(135deg, #f7bb00 0%, #ffd54f 50%, #f7bb00 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
`;

export const Subtitle = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  color: #a0a0a0;
  margin: 0 0 30px 0;
  max-width: 600px;
  line-height: 1.6;
  
  span {
    color: #f7bb00;
    font-weight: 600;
  }
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
`;

export const TechBadge = styled.span`
  background: rgba(247, 187, 0, 0.1);
  border: 1px solid rgba(247, 187, 0, 0.3);
  color: #f7bb00;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: default;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(247, 187, 0, 0.2);
    border-color: #f7bb00;
  }
`;

export const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f7bb00 0%, #e0a800 100%);
  color: #121214;
  font-size: 18px;
  font-weight: 600;
  padding: 16px 40px;
  border-radius: 50px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(247, 187, 0, 0.3);
  
  &:hover {
    box-shadow: 0 8px 25px rgba(247, 187, 0, 0.4);
    transform: translateY(-2px);
  }
`;
