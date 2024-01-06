import React from 'react';
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
} from '@mui/material';
import postData from '../../community/actions/forms/postData';

const educationOptions = [
  '10th pass',
  '12th pass',
  'Graduate',
  'Post-graduate',
  'Doctorate',
];

export default function PersonalInfo() {
  const generalInfoinitialValues = {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(generalInfoinitialValues);
  };

  const handleImageUpload = async (file) => {
    const reader = new FileReader();
    const formData = new FormData();
    formData.append('files', file);
    const response = await postData(
      process.env.REACT_APP_UPLOAD_ENDPOINT,
      formData
    );
    console.log(response);
    reader.onload = () => {
      if (reader.readyState === 2) {
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
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={generalInfoinitialValues.firstName}
              onChange={handleChange}
              margin="normal"
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={generalInfoinitialValues.lastName}
              onChange={handleChange}
              margin="normal"
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Father name"
              name="father_name"
              value={generalInfoinitialValues.father_name}
              onChange={handleChange}
              margin="normal"
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel component="legend">Maritial Status</FormLabel>
              <RadioGroup
                row
                aria-label="maritial"
                name="marital_status"
                value={generalInfoinitialValues.marital_status}
                onChange={handleChange}
                disabled={true}
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
                value={generalInfoinitialValues.gender}
                onChange={handleChange}
                disabled={true}
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
          {generalInfoinitialValues.gender === 'FEMALE' &&
            generalInfoinitialValues.marital_status === 'MARRIED' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Husband name"
                    name="husband name"
                    value={generalInfoinitialValues.husband}
                    onChange={handleChange}
                    margin="normal"
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Father gotra"
                    name="father_gotra"
                    value={generalInfoinitialValues.father_gotra}
                    onChange={handleChange}
                    margin="normal"
                    disabled={true}
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
              value={generalInfoinitialValues.gotra}
              onChange={handleChange}
              margin="normal"
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={generalInfoinitialValues.email}
              onChange={handleChange}
              margin="normal"
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Number"
              name="mobile"
              type="number"
              value={generalInfoinitialValues.mobile}
              onChange={handleChange}
              margin="normal"
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              value={generalInfoinitialValues.dob}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={true}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Education</InputLabel>
              <Select
                label="Education"
                name="education"
                value={generalInfoinitialValues.education}
                onChange={handleChange}
                disabled={true}
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
