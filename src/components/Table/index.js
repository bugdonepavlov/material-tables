import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Имя' },
  { id: 'lastname', numeric: false, disablePadding: false, label: 'Фамилия' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Группа' },
];

const TableUI = ({ data }) => {
  const [table, setTable] = useState({
    order: 'asc',
    orderBy: 'calories',
    page: 0,
    rowsPerPage: 10,
  });

  const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const handleRequestSort = property => {
    const orderBy = property;
    let order = 'desc';

    if (table.orderBy === property && table.order === 'desc') {
      order = 'asc';
    }

    setTable(state => ({ ...state, order, orderBy }));
  };

  const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  const getSorting = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  };

  const handleChangePage = (event, page) =>
    setTable(state => ({ ...state, page }));

  return (
    <Content>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {rows.map(row => (
                <TableCell
                  key={row.id}
                  align="left"
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={table.orderBy === row.id ? table.order : false}
                >
                  {row.id !== 'category' ? (
                    <Tooltip
                      title="Сортировать"
                      placement="bottom-start"
                      enterDelay={200}
                    >
                      <TableSortLabel
                        active={table.orderBy === row.id}
                        direction={table.order}
                        onClick={() => handleRequestSort(row.id)}
                        // onClick={this.createSortHandler(row.id)}
                      >
                        {row.label}
                      </TableSortLabel>
                    </Tooltip>
                  ) : (
                    row.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 &&
              stableSort(data, getSorting(table.order, table.orderBy))
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage,
                )
                .map(e => (
                  <TableRow hover tabIndex={-1} key={e.id}>
                    <TableCell component="th" scope="row">
                      {e.name}
                    </TableCell>
                    <TableCell align="left">{e.lastname}</TableCell>
                    <TableCell align="left">{e.category}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={data.length}
          rowsPerPage={table.rowsPerPage}
          page={table.page}
          labelRowsPerPage=""
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
        />
      </Paper>
    </Content>
  );
};

export default TableUI;

TableUI.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      lastname: PropTypes.string,
      category: PropTypes.string,
    }),
  ).isRequired,
};

const Content = styled.div`
  & > div {
    width: 100%;
    overflow-x: auto;
  }

  td {
    white-space: nowrap;
  }
`;
