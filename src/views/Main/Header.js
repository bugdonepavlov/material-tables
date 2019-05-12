import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from 'styles';
import Button from '@material-ui/core/Button';
import ModalForm from './ModalForm';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <Content>
      <Container>
        <Title>App</Title>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
        >
          Create new user
        </Button>
      </Container>
      <ModalForm open={open} handleClose={() => setOpen(false)} />
    </Content>
  );
};

export default Header;

const Content = styled.div`
  background: #2196f3;
  min-height: 64px;
  padding: 8px 24px;
  display: grid;
  align-items: center;
  margin-bottom: 60px;
`;

const Container = styled.div`
  max-width: 1024px;
  padding: 0 24px;
  margin: 0 auto;
  display: grid;
  width: 100%;
  align-items: center;
  grid-template-columns: 1fr auto;

  ${media.phone`
    padding: 0;
  `}
`;

const Title = styled.span`
  font-size: 20px;
  color: #fff;
`;
