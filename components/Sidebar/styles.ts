import styled from 'styled-components'

export const Container = styled.div`
  @media (min-width: 800px) {
    display: none;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 998;
`;

export const Bar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background: linear-gradient(180deg, #121214 0%, #1a1a1f 100%);
  border-left: 1px solid rgba(247, 187, 0, 0.2);
  z-index: 999;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
`;

export const BarItens = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 25px 25px;
`;

export const MenuButton = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 1000;
  background: rgba(18, 18, 20, 0.9);
  border: 1px solid rgba(247, 187, 0, 0.3);
  border-radius: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  @media (min-width: 800px) {
    display: none;
  }
`;