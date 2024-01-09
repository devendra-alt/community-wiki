import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, FormControl, InputLabel, Input, TextareaAutosize } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GET_USERS_BY_TEMPLE } from '../../../graphql/user/query/getUsersByTemple';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PLAN } from '../../../graphql/plan/mutation/createPlan';

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

    const [createPlan] = useMutation(CREATE_PLAN)

    const { data } = useQuery(GET_USERS_BY_TEMPLE, { variables: { templeID: localStorage.getItem('templeId') } });

    const [formData, setFormData] = React.useState({
        planName: '',
        amount: 0,
        startDate: '',
        endDate: '',
        description: '',
    });

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        const variables = formData
        variables.amount = Number(variables.amount)
        variables.startDate=new Date(variables.startDate).toISOString().split('T')[0]
        variables.endDate=new Date(variables.endDate).toISOString().split('T')[0]
        createPlan({
            variables: variables
        }).then(() => {
            setOpen(false);
            setFormData({
                planName: '',
                amount: 0,
                startDate: '',
                endDate: '',
                description: '',
            });
        })

    };

    const handleFieldChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // TODO: Add logic to submit the form data (e.g., make an API call)
        console.log('Submitting form data:', formData);
        handleClose(); // Close the modal after submitting the form
    };

    console.log(formData);

    return (
        <div>
            <div style={{ marginBottom: '1rem' }}>
                <Button onClick={handleOpen} variant="outlined">
                    Create Plan
                </Button>
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
                                placeholder='Plan Name'
                                name="planName"
                                type="text"
                                value={formData.planName}
                                onChange={handleFieldChange}
                                required
                            />
                        </FormControl>
                        <FormControl style={styles.formControl}>
                            <Input
                                id="amount"
                                placeholder='Amount'
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
                                value={formData.startDate}
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
                                value={formData.endDate}
                                onChange={handleFieldChange}
                                required
                            />
                        </FormControl>
                        <FormControl style={styles.formControl}>

                            <TextareaAutosize
                                id="description"
                                placeholder='description'
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
            <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
                <Table sx={{ minWidth: 650 }} aria-label="collection table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Full Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.usersPermissionsUsers.data.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {row.attributes.email}
                                </TableCell>
                                <TableCell align="left">
                                    {row.attributes.firstname && row.attributes.lastname
                                        ? `${row.attributes.firstname} ${row.attributes.lastname}`
                                        : 'Unknown Name'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllMembersTable;
