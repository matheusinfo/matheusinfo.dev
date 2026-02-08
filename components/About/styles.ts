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
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;

  img {
    border-radius: 50%;
    margin-bottom: 30px;
  }

  p {
    font-size: 18px;
    line-height: 1.8;
    color: #a0a0a0;
    max-width: 600px;

    @media (max-width: 600px) {
      font-size: 16px;
      padding: 0 20px;
    }
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(22px, 4vw, 28px);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 40px 0 30px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #f7bb00, #ffd54f);
    border-radius: 2px;
  }
`;

export const ExperienceTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 600px;
  position: relative;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #f7bb00 0%, transparent 100%);
  }
`;

export const ExperienceCard = styled.div`
  position: relative;
  background: linear-gradient(135deg, rgba(59, 59, 59, 0.8) 0%, rgba(40, 40, 40, 0.9) 100%);
  padding: 25px 30px;
  border-radius: 12px;
  border: 1px solid rgba(247, 187, 0, 0.2);
  transition: all 0.3s ease;

  .timeline-dot {
    position: absolute;
    left: -26px;
    top: 30px;
    width: 12px;
    height: 12px;
    background: #f7bb00;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(247, 187, 0, 0.5);
  }

  h3 {
    color: #f7bb00;
    font-size: 22px;
    margin: 0 0 5px 0;
  }

  h4 {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 10px 0;
  }

  .period {
    display: inline-block;
    color: #888;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 15px;
    padding: 4px 12px;
    background: rgba(247, 187, 0, 0.1);
    border-radius: 20px;
  }

  p {
    color: #a0a0a0;
    font-size: 15px;
    line-height: 1.6;
    margin: 0;
  }

  &:hover {
    border-color: rgba(247, 187, 0, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

export const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  max-width: 700px;
  margin-bottom: 40px;
`;

type SkillBadgeProps = {
  category: string;
};

const categoryColors: Record<string, string> = {
  frontend: "#61dafb",
  backend: "#68a063",
  mobile: "#02569b",
  database: "#336791",
  devops: "#2496ed",
  testing: "#c21325",
  tools: "#f05032",
};

export const SkillBadge = styled.div<SkillBadgeProps>`
  padding: 10px 20px;
  background: ${({ category }) =>
    `rgba(${categoryColors[category] ? "247, 187, 0" : "255, 255, 255"}, 0.1)`};
  border: 1px solid ${({ category }) => categoryColors[category] || "#f7bb00"};
  color: ${({ category }) => categoryColors[category] || "#f7bb00"};
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: default;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ category }) => categoryColors[category] || "#f7bb00"};
    color: #121214;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const ProjectsCard = styled.div`
  text-align: center;
  margin-bottom: 30px;

  p {
    font-size: 16px;
    color: #a0a0a0;
    line-height: 1.8;
  }

  a {
    color: #f7bb00;
    text-decoration: none;
    font-weight: 600;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: #f7bb00;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

export const HandleText = styled.span`
  color: #f7bb00;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 10px rgba(247, 187, 0, 0.5);
  }
`;
