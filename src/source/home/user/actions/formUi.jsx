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
} from '@mui/material';

export default function FormUI({
  handleChange,
  userFormData,
  handleSubmit,
  educationOptions,
}) {
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} id="user-personal-info">
        <Grid>
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
                    name="husband_name"
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
            <FormControl fullWidth>
              <InputLabel>Education</InputLabel>
              <Select
                label="Education"
                name="education"
                value={userFormData.education} // Changed from "userFormData.educationOptions"
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
