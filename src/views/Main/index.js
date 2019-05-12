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

const Main = ({
  fetchDataTable,
  loading,
  nav,
  mainData,
  managementData,
  accountData,
  humanData,
  emptyData,
}) => {
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
        {!loading && !!mainData ? (
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
              {currentTab === 0 && <Table data={mainData} />}
              {currentTab === 1 && <Table data={accountData} />}
              {currentTab === 2 && <Table data={humanData} />}
              {currentTab === 3 && <Table data={managementData} />}
              {currentTab === 4 && <Table data={emptyData} />}
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
    mainData: selectors.getMainData(state),
    managementData: selectors.getManagementData(state),
    humanData: selectors.getHumanData(state),
    accountData: selectors.getAccountingData(state),
    emptyData: selectors.getEmptyCategoryData(state),
    loading: selectors.getLoading(state),
    nav: selectors.getNavigation(state),
  }),
  { ...effects },
)(Main);

Main.propTypes = {
  fetchDataTable: PropTypes.func.isRequired,
  mainData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      lastname: PropTypes.string,
      category: PropTypes.string,
    }),
  ).isRequired,
  managementData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      lastname: PropTypes.string,
      category: PropTypes.string,
    }),
  ).isRequired,
  humanData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      lastname: PropTypes.string,
      category: PropTypes.string,
    }),
  ).isRequired,
  accountData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      lastname: PropTypes.string,
      category: PropTypes.string,
    }),
  ).isRequired,
  emptyData: PropTypes.arrayOf(
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
