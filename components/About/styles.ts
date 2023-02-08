import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 150px;
  z-index: 1;
  margin-top: 50px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    text-transform: uppercase;
    font-size: 25px;
  }

  p {
    margin: 15px auto 25px auto;
    max-width: 600px;
    font-size: 18px;
    text-align: justify;

    @media (max-width: 700px) {
      width: 500px;
      font-size: 16px;
    }

    @media (max-width: 600px) {
      width: 400px;
      font-size: 16px;
    }

    @media (max-width: 500px) {
      width: 300px;
      font-size: 14px;
    }
  }

  span {
    margin: 25px 0;
    color: #f7bb00;
    font-weight: bolder;

    :hover {
      text-decoration: underline;
    }
  }
`;

export const ExperienceCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #3b3b3b;
  padding: 20px;
  margin-bottom: 50px;
  border-radius: 4px;

  h1 {
    color: #f7bb00;
  }

  p {
    text-align: justify;
  }
`;

export const ProjectsCard = styled.div`
  p {
    text-align: justify;
  }

  a {
    color: #f7bb00;
    cursor: pointer;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;

export const SkillsCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  padding: 0 25px;

  div {
    text-align: start;
    margin-bottom: 5px;

    span {
      margin-right: 10px;
      font-size: 18px;
    }

    small {
      font-size: 18px;
    }
  }
`;
