import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container, Grid, Switch, FormControlLabel, TextField } from '@mui/material';
import CreateAddress from '../../address/actions/create';

import { useMutation, useQuery } from '@apollo/client';
import CREATE_TEMPLE from '../../../graphql/temple/mutation/createTEmple';

import GET_TEMPLES from '../../../graphql/temple/query/getTemples';
import TempleCard from './templeCard';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '78%',
  height: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overFlow: 'scroll'
};

// ... (previous imports)

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showAddAddress, setShowAddAddress] = React.useState(false);
  const [addAddressId, setAddAddressId] = React.useState();

  const [createTemple] = useMutation(CREATE_TEMPLE)
  const { data } = useQuery(GET_TEMPLES)

  // State object to store form field values
  const [formValues, setFormValues] = React.useState({
    name: '',
    startdate: '',
    isHostel: false,
    stay: false,
    food: false,
  });

  // Function to update form field values
  const handleFormChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // Function to save shop
  const saveShop = () => {
    // Add your logic here to save the shop with all field values
    console.log('Shop saved with values:', { ...formValues, addAddressId });
    createTemple({
      variables: {
        ...formValues,
        addressId: addAddressId
      },
      refetchQueries: [
        {
          query: GET_TEMPLES
        }
      ]
    }).then(() => {
      setFormValues({
        name: '',
        startdate: '',
        isHostel: false,
        stay: false,
        food: false,
      })
      setAddAddressId()
    }
    )
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Button variant="outlined" onClick={handleOpen}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Container maxWidth="sm">
            <form>
              <TextField
                fullWidth
                label="Temple Name"
                name="name"
                margin="normal"
                value={formValues.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
              />

              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="standard"
                label="Start Date"
                name="startdate"
                type="date"
                margin="normal"
                value={formValues.startdate}
                onChange={(e) => handleFormChange('startdate', e.target.value)}
                sx={{ marginTop: '1rem' }} // Added styling to create space between label and input
              />
              {/* Boolean fields wrapped in a div for layout control */}
              <div style={{ marginTop: '1rem' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.isHostel}
                      onChange={() => handleFormChange('isHostel', !formValues.isHostel)}
                    />
                  }
                  label="Is Hostel"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.stay}
                      onChange={() => handleFormChange('stay', !formValues.stay)}
                    />
                  }
                  label="Stay"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.food}
                      onChange={() => handleFormChange('food', !formValues.food)}
                    />
                  }
                  label="Food"
                />
              </div>

              {/* Add Address button */}
              <Button variant="outlined" onClick={() => setShowAddAddress(true)} style={{ marginTop: '1rem' }}>
                Add Address
              </Button>
              {showAddAddress && (
                <CreateAddress
                  setShowAddAddress={setShowAddAddress}
                  setAddressId={setAddAddressId}
                  addressType={'SHOP'}
                />
              )}

              <Grid item xs={12} md={6}>
                <Button
                  style={{ marginTop: '2rem' }}
                  disabled={addAddressId === undefined ? true : false}
                  variant="outlined"
                  onClick={() => saveShop()}
                >
                  Save Temple
                </Button>
              </Grid>
            </form>
          </Container>
        </Box>
      </Modal>
      <ul style={{ padding: '1rem' }}>
        {data?.temples.data.map((temple, index) => {
          return (
            <li style={{ marginBottom: '1rem' }} key={index}>
              <TempleCard temple={temple} />
            </li>
          );
        })}
      </ul>

    </div>
  );
}

