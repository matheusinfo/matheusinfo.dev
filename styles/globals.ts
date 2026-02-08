import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: linear-gradient(135deg, #121214 0%, #1a1a1f 50%, #121214 100%);
    background-attachment: fixed;
    color: #fff;
    min-height: 100vh;
  }

  button {
    cursor: pointer;
  }

  ::selection {
    background: #f7bb00;
    color: #121214;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1f;
  }

  ::-webkit-scrollbar-thumb {
    background: #f7bb00;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #d9a400;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`
export default GlobalStyle