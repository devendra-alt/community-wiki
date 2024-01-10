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

const WorkDetailsForm = ({
  formDataPersist,
  setFormDataPersist,
  setAddressId,
}) => {
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

  const consumerMarkets = [
    '',
    'Electronics Market',
    'Fashion and Apparel Market',
    'Home Appliances Market',
    'Beauty and Personal Care Market',
    'Grocery Market',
    'Furniture Market',
    'Sporting Goods Market',
    'Automobile Market',
  ];

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
            variant="standard"
            label="Start Date"
            name="startdate"
            type="date"
            value={formDataPersist[1]?.startdate}
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
              <MenuItem value="" key={0}>
                None
              </MenuItem>
              <MenuItem value="RETAL" key={1}>
                RETAL
              </MenuItem>
              <MenuItem value="WHOLSALE" key={2}>
                WHOLESALE
              </MenuItem>
              <MenuItem value="SERVICE" key={3}>
                SERVICE
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>SubType</InputLabel>
            <Select
              value={formDataPersist[1]?.businessSubType}
              onChange={handleInputChange}
              name="businessSubType"
            >
              {consumerMarkets.map((market, index) => (
                <MenuItem key={index} value={market}>
                  {market}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Turnover"
            name="turnover"
            type="number"
            value={formDataPersist[1]?.turnover}
            onChange={handleInputChange}
            margin="normal"
          />
          <Button variant="outlined" onClick={() => setAddAddress(true)}>
            Add Address
          </Button>
          {addAddress && (
            <CreateAddress setAddressId={setAddAddress} addressType={'SHOP'} />
          )}
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
        </form>
      )}
      {occupation === 'job' && (
        <form>
          <TextField
            fullWidth
            label="Job Type"
            name="jobType"
            value={formDataPersist[1]?.jobType}
            onChange={handleInputChange}
            margin="normal"
          />
        </form>
      )}
    </Container>
  );
};

export default WorkDetailsForm;
