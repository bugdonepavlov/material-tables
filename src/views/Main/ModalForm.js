import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { effects } from 'redux/ducks/main.duck';
import styled from 'styled-components';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const categories = [
  {
    value: 'accounting',
    label: 'Accounting',
  },
  {
    value: 'human resources',
    label: 'Human resources',
  },
  {
    value: 'management',
    label: 'Management',
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
});

const ModalForm = ({ open, handleClose, createUser }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle id="form-dialog-title">Create new user</DialogTitle>
    <DialogContent>
      <Formik
        initialValues={{ name: '', lastname: '', category: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          createUser(values, actions, handleClose);
        }}
        render={({ touched, errors, isValid }) => (
          <StyledForm>
            <Field
              name="name"
              render={({ field }) => (
                <TextField
                  id="name"
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  error={Boolean(errors.name && touched.name)}
                  helperText={touched.name ? errors.name : ''}
                  {...field}
                />
              )}
            />

            <Field
              name="lastname"
              render={({ field }) => (
                <TextField
                  id="lastname"
                  margin="dense"
                  label="LastName"
                  type="text"
                  fullWidth
                  error={Boolean(errors.lastname && touched.lastname)}
                  helperText={touched.lastname ? errors.lastname : ''}
                  {...field}
                />
              )}
            />

            <Field
              name="category"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  id="category"
                  margin="dense"
                  label="Category"
                  fullWidth
                >
                  {categories.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <ButtonActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button color="secondary" type="submit" disabled={!isValid}>
                Accept
              </Button>
            </ButtonActions>
          </StyledForm>
        )}
      />
    </DialogContent>
  </Dialog>
);

export default connect(
  null,
  { ...effects },
)(ModalForm);

ModalForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
};

const StyledForm = styled(Form)`
  display: grid;
  grid-gap: 14px 0;
`;

const ButtonActions = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 0 14px;
  grid-auto-flow: column;
  justify-content: end;
  margin-top: 26px;
`;
