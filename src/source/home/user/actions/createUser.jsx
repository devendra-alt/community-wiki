import React, { useState } from 'react';
import fetchGeoData from '../../community/actions/getGeodetails';
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
import InputFileUpload from '../../../../assets/buttons/InputFileUpload';
import postData from '../../community/actions/forms/postData';
const initData = {
  image: null,
  firstName: '',
  lastName: '',
  email: '',
  mobile: null,
  dob: '',
  gender: '',
  education: '',
  marital_status: '',
  husband_name: '',
  father_name: '',
  gotra: '',
  father_gotra: '',
  pinCode: Number('000000'),
  district: '',
  city: '',
  state: '',
  latitude: '',
  longitude: '',
  completAddress: '',
};

export default function CreateUser() {
  const educationOptions = [
    '10th pass',
    '12th pass',
    'Graduate',
    'Post-graduate',
    'Doctorate',
  ];

  const [userFormData, setUserFormData] = useState(initData);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'pinCode' && value.toString().length === 6) {
      try {
        const response = await fetchGeoData(value.toString());
        const data = response.data[0];
        setUserFormData((prevState) => {
          return {
            ...prevState,
            [name]: value,
            district: data?.districtname ?? '',
            city: data?.city ?? '',
            state: data?.statename ?? '',
          };
        });
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    } else {
      setUserFormData((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
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
        setUserFormData((prevState) => {
          return {
            ...prevState,
            image: response[0],
          };
        });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [error, setError] = useState(false);

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserFormData((prevState) => {
            return {
              ...prevState,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
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
    console.log(userFormData);
    console.log('need to be submited!');
  };

  return (
    <>
      <Container maxWidth="sm">
        {JSON.stringify('need to pass temple id')}
        <form onSubmit={handleSubmit} id="user-personal-info">
          <Grid>
            <Grid item xs={12} align="center" spacing={2}>
              <Avatar
                src={userFormData.image?.url}
                sx={{ width: 100, height: 100 }}
              />
              <InputFileUpload onChange={handleImageUpload} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={userFormData.firstName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={userFormData.lastName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Father name"
                name="father_name"
                value={userFormData.father_name}
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
                  value={userFormData.marital_status}
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
                  value={userFormData.gender}
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
            {userFormData.gender === 'FEMALE' &&
              userFormData.marital_status === 'MARRIED' && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Husband name"
                      name="husband name"
                      value={userFormData.husband}
                      onChange={handleChange}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Father gotra"
                      name="father_gotra"
                      value={userFormData.father_gotra}
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
                value={userFormData.gotra}
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
                value={userFormData.email}
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
                value={userFormData.mobile}
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
                value={userFormData.dob}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="PIN CODE"
                name="pinCode"
                type="number"
                value={userFormData.pinCode}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="District"
                name="district"
                value={userFormData.district}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={userFormData.city}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="state"
                name="state"
                value={userFormData.state}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Complete Address"
                name="completAddress"
                value={userFormData.completAddress}
                onChange={handleChange}
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
                value={userFormData.latitude}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Longitude"
                name="longitude"
                value={userFormData.longitude}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Education</InputLabel>
                <Select
                  label="Education"
                  name="education"
                  value={userFormData.education}
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
    </>
  );
}
