import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Container,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Avatar,
  Button,
} from '@mui/material';
import InputFileUpload from '../../../../../assets/buttons/InputFileUpload';
import postData from '../../../../network/post/postData';
import fetchGeoData from '../../../../address/webapi/getGeodetails';
import CreateAddress from '../../../../address/actions/create';

const educationOptions = [
  '10th pass',
  '12th pass',
  'Graduate',
  'Post-graduate',
  'Doctorate',
];

export default function GeneralInfo({ formDataPersist, setFormDataPersist }) {
  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'pinCode' && value.toString().length === 6) {
      try {
        const response = await fetchGeoData(value.toString());
        const data = response.data[0];
        setFormDataPersist((prevState) => {
          const updatedData = {
            ...prevState[0],
            [name]: value,
            district: data?.districtname ?? '',
            city: data?.city ?? '',
            state: data?.statename ?? '',
          };
          return [updatedData, ...prevState.slice(1)];
        });
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    } else {
      setFormDataPersist((prevState) => {
        const updatedState = prevState.map((obj, index) => {
          if (index === 0) {
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
  const [addAddress, setAddAddress] = useState(false);

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormDataPersist((prevState) => {
            const newState = [...prevState];
            newState[0] = {
              ...newState[0],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formDataPersist[0]);
  };

  const handleImageUpload = async (file) => {
    const reader = new FileReader();
    const formData = new FormData();
    formData.append('files', file);
    const response = await postData(
      process.env.REACT_APP_UPLOAD_ENDPOINT,
      formData
    );
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormDataPersist((prevState) => {
          const newState = [...prevState];
          newState[0] = {
            ...newState[0],
            image: response[0],
          };
          return newState;
        });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} id="user-personal-info">
        <Grid>
          <Grid item xs={12} align="center" spacing={2}>
            <Avatar
              src={formDataPersist[0].image?.url}
              sx={{ width: 100, height: 100 }}
            />
            <InputFileUpload onChange={handleImageUpload} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formDataPersist[0].firstName}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formDataPersist[0].lastName}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Father name"
              name="father_name"
              value={formDataPersist[0].father_name}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel component="legend">Maritial Status</FormLabel>
              <RadioGroup
                row
                aria-label="maritial"
                name="marital_status"
                value={formDataPersist[0].marital_status}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="MARRIED"
                  control={<Radio />}
                  label="MARRIED"
                />
                <FormControlLabel
                  value="UNMARIED"
                  control={<Radio />}
                  label="UNMARIED"
                />
                <FormControlLabel
                  value="DIVORCED"
                  control={<Radio />}
                  label="DIVORCED"
                />
                <FormControlLabel
                  value="WIDOW"
                  control={<Radio />}
                  label="WIDOW"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={formDataPersist[0].gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="MALE"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="FEMALE"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {formDataPersist[0].gender === 'FEMALE' &&
            formDataPersist[0].marital_status === 'MARRIED' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Husband name"
                    name="husband name"
                    value={formDataPersist[0].husband}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Father gotra"
                    name="father_gotra"
                    value={formDataPersist[0].father_gotra}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
              </>
            )}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Gotra"
              name="gotra"
              type="text"
              value={formDataPersist[0].gotra}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formDataPersist[0].email}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Number"
              name="mobile"
              type="number"
              value={formDataPersist[0].mobile}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              value={formDataPersist[0].dob}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" onClick={() => setAddAddress(true)}>
              Add Address
            </Button>
          </Grid>

          {addAddress && <CreateAddress />}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Education</InputLabel>
              <Select
                label="Education"
                name="education"
                value={formDataPersist[0].education}
                onChange={handleChange}
              >
                {educationOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
