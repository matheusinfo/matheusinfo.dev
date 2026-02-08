import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    color: #f7bb00;
    margin-bottom: 20px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 30px;
      height: 2px;
      background: #f7bb00;
      
      @media (max-width: 600px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;
