import { css, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { media } from './media';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  #root,
  body,
  html {
    height: 100%;
  }

  #modal-root {
    position: relative;
    z-index: 1050;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #191919;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    line-height: 38px;
    font-size: 34px;
    font-weight: 500;
  }

  h2 {
    line-height: 1.4;
    font-size: 36px;
    font-weight: 500;
    margin: 0px 0px 15px;

    ${media.phone`
      font-size: 24px;
    `}
  }

  h3 {
    font-size: 36px;
    line-height: 1.3;
    font-weight: 500;
    margin: 0px 0px 15px;

    ${media.phone`
      font-size: 18px;
    `}
  }

  h4 {
    font-size: 24px;
    line-height: 120%;
    font-weight: 500;
    margin: 0px 0px 15px;

    ${media.phone`
      font-size: 18px;
    `}
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
    margin: 0px 0px 20px;
  }

  button {
    font-weight: 300;
    font-family: 'Montserrat', sans-serif;
    &:focus {
      outline: none;
    }
  }

  a {
    line-height: 22px;
    transition: all 0.2 ease;
    color: initial;
    text-decoration: none;
    &:hover {
      opacity: 0.8;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  textarea, input {
    font-family: 'Montserrat', sans-serif;
  }
`;

export const ResetDefaultButton = css`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

export const Container = css`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 25px;
`;
