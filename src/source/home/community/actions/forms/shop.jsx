import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import fetchGeoData from '../../../../address/webapi/getGeodetails';
import CreateAddress from '../../../../address/actions/create';

const WorkDetailsForm = ({ formDataPersist, setFormDataPersist }) => {
  const [occupation, setOccupation] = useState('');

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === 'pinCode' && value.toString().length === 6) {
      try {
        const response = await fetchGeoData(value.toString());
        const data = response.data[0];
        setFormDataPersist((prevState) => {
          const updatedData = {
            ...prevState[1],
            [name]: value,
            district: data?.districtname ?? '',
            city: data?.city ?? '',
            state: data?.statename ?? '',
          };
          const updatedArray = prevState.map((obj, index) =>
            index === 1 ? updatedData : obj
          );
          return updatedArray;
        });
        console.log(formDataPersist);
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    } else {
      setFormDataPersist((prevState) => {
        const updatedState = prevState.map((obj, index) => {
          if (index === 1) {
            return { ...obj, [name]: value };
          }
          return obj;
        });
        return updatedState;
      });
      console.log(formDataPersist);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormDataPersist({ ...formDataPersist, multipleImages: files });
  };

  const [addAddress, setAddAddress] = useState(false);

  return (
    <Container maxWidth="sm">
      <FormControl fullWidth margin="normal">
        <InputLabel>Occupation</InputLabel>
        <Select value={occupation} onChange={handleOccupationChange}>
          <MenuItem value="shopOwner">Shop Owner</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="job">Job</MenuItem>
        </Select>
      </FormControl>
      {occupation === 'shopOwner' && (
        <form>
          <TextField
            fullWidth
            label="Shop Name"
            name="shopName"
            value={formDataPersist[1]?.shopName}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Year Established"
            name="yearEstablished"
            value={formDataPersist[1]?.yearEstablished}
            onChange={handleInputChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={formDataPersist[1]?.businessType}
              onChange={handleInputChange}
              name="businessType"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="RETAL">RETAL</MenuItem>
              <MenuItem value="WHOLSALE">WHOLESALE</MenuItem>
              <MenuItem value="SERVICE">SERVICE</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Size</InputLabel>
            <Select
              value={formDataPersist[1]?.size}
              onChange={handleInputChange}
              name="size"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="SMALL">SMALL</MenuItem>
              <MenuItem value="MEDIUM">MEDIUM</MenuItem>
              <MenuItem value="LARGE">LARGE</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={() => setAddAddress(true)}>
            Add Address
          </Button>
          {addAddress && <CreateAddress />}
        </form>
      )}
      {occupation === 'business' && (
        <form>
          <TextField
            fullWidth
            label="Business Type"
            name="businessType"
            value={formDataPersist[1]?.businessType}
            onChange={handleInputChange}
            margin="normal"
          />
          {/* Add more fields for business */}
        </form>
      )}
      {occupation === 'job' && (
        <form>
          {/* Job-related fields */}
          <TextField
            fullWidth
            label="Job Type"
            name="jobType"
            value={formDataPersist[1]?.jobType}
            onChange={handleInputChange}
            margin="normal"
          />
          {/* Add more fields for job */}
        </form>
      )}
    </Container>
  );
};

export default WorkDetailsForm;
