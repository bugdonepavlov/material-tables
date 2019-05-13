import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Content>
    <Title>
      <h2>Not Found</h2>
      <StyledLink to="/">Go to home</StyledLink>
    </Title>
  </Content>
);

export default NotFound;

const Content = styled.div`
  background: #1976d2;
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: grid;
  justify-items: center;

  h2 {
    color: #fff;
  }
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  padding: 6px 16px;
  min-width: 64px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  line-height: 1.75;
  font-weight: 500;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  background: rgba(255, 255, 255, 0.6);
`;
