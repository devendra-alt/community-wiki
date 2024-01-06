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
import fetchGeoData from '../getGeodetails';

const WorkDetailsForm = ({ formDataPersist, setFormDataPersist }) => {
  const [occupation, setOccupation] = useState('');

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'pinCode' && value.toString().length === 6) {
      try {
        const response = await fetchGeoData(value.toString());
        const data = response.data[0];
        setFormDataPersist((prevState) => ({
          ...prevState,
          [1]: {
            ...prevState[1],
            [name]: value,
            district: data?.districtname ?? '',
            city: data?.districtname ?? '',
          },
        }));
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    } else {
      setFormDataPersist((prevState) => ({
        ...prevState,
        [1]: {
          ...prevState[1],
          [name]: value,
        },
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormDataPersist({ ...formDataPersist, multipleImages: files });
  };

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
          <TextField
            fullWidth
            label="Pincode"
            name="pinCode"
            value={formDataPersist[1]?.pinCode}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formDataPersist[1]?.city}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="District"
            name="district"
            value={formDataPersist[1]?.district}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="address"
            name="completeAddress"
            value={formDataPersist[1]?.completAddress}
            onChange={handleInputChange}
            margin="normal"
          />
        </form>
      )}
      {occupation === 'business' && (
        <form>
          {/* Business-related fields */}
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
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </Container>
  );
};

export default WorkDetailsForm;
