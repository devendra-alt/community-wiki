import React, { useState } from 'react';
import FormSteppers from './stepperOverride';
import './style.css';
import { Button } from '@mui/material';
import GeneralInfo from './forms/generalInfo';
import WorkDetailsForm from './forms/shop';
import LocationComponent from './forms/location';

const generalInfoinitialValues = {
  image: '',
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  dob: '',
  gender: '',
  education: '',
};

const workInfoinitialValues = {
  shopName: '',
  yearEstablished: '',
  multipleImages: [],
  defaultImage: '',
  businessType: '',
  jobType: '',
  pinCode: Number('000000'),
  completAddress: '',
  district: '',
  city: '',
  state: '',
};

export default function AddMember() {
  const [formDataPersist, setFormDataPersist] = useState([
    { ...generalInfoinitialValues },
    { ...workInfoinitialValues },
    { ...generalInfoinitialValues },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const nextStep = () => {
    setActiveIndex((prev) => (prev === 2 ? prev : prev + 1));
  };

  const prevStep = () => {
    setActiveIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  return (
    <div className="add-container">
      <FormSteppers activeIndex={activeIndex} />
      {activeIndex === 0 ? (
        <GeneralInfo
          formDataPersist={formDataPersist}
          setFormDataPersist={setFormDataPersist}
        />
      ) : activeIndex === 1 ? (
        <WorkDetailsForm
          formDataPersist={formDataPersist}
          setFormDataPersist={setFormDataPersist}
        />
      ) : null}
      <div className="form-controller-btns">
        {activeIndex > 0 ? (
          <Button variant="outlined" onClick={prevStep}>
            Back
          </Button>
        ) : (
          <LocationComponent />
        )}
        {activeIndex < 2 ? (
          <Button
            form="user-personal-info"
            variant="outlined"
            onClick={nextStep}
            type="submit"
          >
            Next
          </Button>
        ) : (
          <Button variant="contained">Create Member</Button>
        )}
      </div>
    </div>
  );
}
