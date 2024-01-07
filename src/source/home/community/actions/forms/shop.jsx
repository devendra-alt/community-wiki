import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import fetchGeoData from '../getGeodetails';

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

  const [error, setError] = useState(false);

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormDataPersist((prevState) => {
            const newState = [...prevState];
            newState[1] = {
              ...newState[1],
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            return newState;
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
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
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="PIN CODE"
              name="pinCode"
              type="number"
              value={formDataPersist[1].pinCode}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="District"
              name="district"
              value={formDataPersist[1].district}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formDataPersist[1].city}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="state"
              name="state"
              value={formDataPersist[1].state}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Complete Address"
              name="completAddress"
              value={formDataPersist[1].completAddress}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setCurrentLocation()}
            >
              Set Current Location
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Latitude"
              name="latitude"
              value={formDataPersist[1].latitude}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Longitude"
              name="longitude"
              value={formDataPersist[1].longitude}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
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
    </Container>
  );
};

export default WorkDetailsForm;
