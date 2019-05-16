import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { effects, selectors } from 'redux/ducks/main.duck';

import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Table from 'components/Table';
import Header from './Header';

const Main = ({ fetchDataTable, loading, nav, data }) => {
  const [currentTab, setTab] = useState(0);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  const handleChange = (event, value) => {
    setTab(value);
  };

  return (
    <Content>
      <Header />
      <ContainerTables>
        {!loading && !!data ? (
          <>
            <AppBar position="static">
              <Tabs
                value={currentTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
              >
                {nav.map((e, index) => (
                  <Tab
                    key={index}
                    component="a"
                    onClick={event => event.preventDefault()}
                    label={e || 'Empty'}
                    href={`page${index}`}
                  />
                ))}
              </Tabs>
            </AppBar>
            <TabsContainer>
              {nav.map((entity, index) => {
                let newData = data.filter(e => e.category === entity);

                if (entity === 'all') {
                  newData = data;
                }

                return currentTab === index && <Table data={newData} />;
              })}
            </TabsContainer>
          </>
        ) : (
          <CircularProgress />
        )}
      </ContainerTables>
    </Content>
  );
};

export default connect(
  state => ({
    data: selectors.getMainData(state),
    loading: selectors.getLoading(state),
    nav: selectors.getNavigation(state),
  }),
  { ...effects },
)(Main);

Main.propTypes = {
  fetchDataTable: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      lastname: PropTypes.string,
      category: PropTypes.string,
    }),
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  nav: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Content = styled.div`
  margin: 0 auto 60px;
  position: relative;
`;

const ContainerTables = styled.div`
  max-width: 1024px;
  padding: 0 12px;
  margin: 0 auto;
`;

const TabsContainer = styled.div`
  margin-top: 40px;
`;
