import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  TextareaAutosize,
  Avatar,
  MenuItem,
  Select,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GET_USERS_BY_TEMPLE } from '../../../graphql/user/query/getUsersByTemple';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PLAN } from '../../../graphql/plan/mutation/createPlan';
import { DataGrid } from '@mui/x-data-grid';
import GET_PLANS from '../../../graphql/payment/query/getPlans';

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formControl: {
    width: '100%',
    marginBottom: '1rem',
  },
  submitButton: {
    marginTop: '1rem',
  },
};

const AllMembersTable = () => {
  const [open, setOpen] = React.useState(false);

  const [createPlan] = useMutation(CREATE_PLAN);

  const { data } = useQuery(GET_USERS_BY_TEMPLE, {
    variables: { templeID: localStorage.getItem('templeId') },
  });

  const [formData, setFormData] = React.useState({
    planName: '',
    amount: 0,
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData({
      planName: '',
      amount: 0,
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const handleFieldChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const variables = formData;
    const isFormDataEmpty = Object.values(formData).some(
      (value) => value === '' || value === 0
    );
    if (isFormDataEmpty) return;
    variables.amount = Number(variables.amount);
    variables.startDate = variables.startDate;
    variables.endDate = variables.endDate;
    createPlan({
      variables: variables,
    }).then(() => {
      setOpen(false);
      setFormData({
        planName: '',
        amount: 0,
        startDate: '',
        endDate: '',
        description: '',
      });
    });
    console.log('Submitting form data:', formData);
    handleClose();
  };

  const handleShowDetails = () => {
    console.log('hello!');
  };

  const { data: planDetails } = useQuery(GET_PLANS, {
    variables: {
      $templeID: localStorage.getItem('templeId'),
    },
  });

  const [selectedPlan, setSelectedPlan] = useState(
    planDetails.plans.data[0].id
  );
  const [currentPlanData, setCurrentPlanData] = useState(
    planDetails.plans.data[0]
  );

  //   const planDetails_ = planDetils?.plans?.data?.map((plan) => {
  //     return {
  //       plan_name: plan.attributes.plan_name,
  //     };
  //   });

  const getRecivedAmount = () => {};
  getRecivedAmount();
  const dataSet = data?.usersPermissionsUsers?.data.map((user) => ({
    id: user.id,
    photo:
      user?.attributes?.photo?.data?.attributes?.formats?.thumbnail?.url ??
      'https://mui.com/static/images/avatar/2.jpg',
    email: user.attributes?.email,
    username:
      user.attributes?.firstname && user.attributes?.lastname
        ? `${user.attributes.firstname} ${user.attributes.lastname}`
        : 'Unknown Name',
    total_amount: selectedPlan,
    // recived_amount:
  }));

  const handleAddAmount = () => {
    console.log('handle amount paymet');
  };

  const columns = [
    {
      field: 'photo',
      headerName: 'Photo',
      width: 120,
      renderCell: (params) => (
        <Avatar alt={params.row.username} src={params.value} />
      ),
    },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'total_amount', headerName: 'Total Amount', width: 200 },
    { field: 'recived_amount', headerName: 'Recived Amount', width: 200 },
    { field: 'due_amount', headerName: 'Due Amount', width: 200 },
    { field: 'plan', headerName: 'Plan', width: 200 },
    {
      field: 'add_amount',
      headerName: 'Add Amount',
      width: 200,
      renderCell: (params) => {
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddAmount}
        ></Button>;
      },
    },
    {
      field: 'showDetails',
      headerName: 'Show Details',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleShowDetails(params.row.id)}
        >
          Show Details
        </Button>
      ),
    },
  ];

  const [filterModel, setFilterModel] = React.useState({
    items: [
      {
        field: 'rating',
        operator: '>',
        value: '2.5',
      },
    ],
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedPlan(e.target.value);
    setCurrentPlanData(
      planDetails.plans.data.filter((id) => id === e.target.value)
    );
    console.log(currentPlanData);
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '2rem' }}>
        <Button onClick={handleOpen} variant="outlined">
          Create Plan
        </Button>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedPlan}
          label="Plan"
          onChange={handleChange}
        >
          {planDetails?.plans?.data?.map((plan) => {
            return (
              <MenuItem value={plan.id}>{plan.attributes?.plan_name}</MenuItem>
            );
          })}
        </Select>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Plan
          </Typography>
          <form style={styles.form} onSubmit={handleFormSubmit}>
            <FormControl style={styles.formControl}>
              <Input
                id="planName"
                placeholder="Plan Name"
                name="planName"
                type="text"
                value={selectedPlan}
                onChange={handleFieldChange}
                required
              />
            </FormControl>
            <FormControl style={styles.formControl}>
              <Input
                id="amount"
                placeholder="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleFieldChange}
                required
              />
            </FormControl>
            <InputLabel htmlFor="startDate">Start Date</InputLabel>
            <FormControl style={styles.formControl}>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={
                  formData.startDate
                    ? formData.startDate
                    : new Date().toISOString().split('T')[0]
                }
                onChange={handleFieldChange}
                required
              />
            </FormControl>
            <InputLabel htmlFor="endDate">End Date</InputLabel>
            <FormControl style={styles.formControl}>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={
                  formData.endDate
                    ? formData.endDate
                    : new Date().toISOString().split('T')[0]
                }
                onChange={handleFieldChange}
                required
              />
            </FormControl>
            <FormControl style={styles.formControl}>
              <TextareaAutosize
                id="description"
                placeholder="description"
                minRows={3}
                maxRows={5}
                name="description"
                value={formData.description}
                onChange={handleFieldChange}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={styles.submitButton}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      {dataSet && dataSet.length > 0 ? (
        <DataGrid
          columns={columns}
          rows={dataSet}
          filterModel={filterModel}
          onFilterModelChange={(newFilterModel) =>
            setFilterModel(newFilterModel)
          }
        ></DataGrid>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AllMembersTable;
