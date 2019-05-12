import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import Main from './Main';
import NotFound from './NotFound';

const RootRoutes = () => (
  <Content>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Main} />
      <Route render={rest => <NotFound {...rest} />} />
    </Switch>
  </Content>
);

export default RootRoutes;

const Content = styled.div``;
