import React, { useState } from 'react';
import FormSteppers from './stepperOverride';
import './style.css';
import { Button } from '@mui/material';
import GeneralInfo from './forms/generalInfo';
import WorkDetailsForm from './forms/shop';
import LocationComponent from './forms/location';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../../graphql/user/mutation/createUser';

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

  const [createUser] = useMutation(CREATE_USER);

  const [activeIndex, setActiveIndex] = useState(0);
  const nextStep = () => {
    setActiveIndex((prev) => (prev === 2 ? prev : prev + 1));
  };

  const prevStep = () => {
    setActiveIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const handleCreateMemeber = () => {
    console.log(formDataPersist);
    const variables = {
      firstname: formDataPersist[0].firstName,
      lastname: formDataPersist[0].lastName,
      sex: formDataPersist[0].gender,
      photo: formDataPersist[0].image.id,
      // dob: new Date(formDataPersist[0].dob),
      username: 'devendraM',
      email: 'devendraM@hph.com',
      password: 'Welcome@123',
      mobile: Number(formDataPersist[0].mobile),
      temples: [1],
      education_level: formDataPersist[0].education,
      marital_status: formDataPersist[0].marital_status,
      father_name: formDataPersist[0].father_name,
      husband_name: formDataPersist[0].husband_name,
      gotra: formDataPersist[0].gotra,
      father_gotra: formDataPersist[0].father_gotra,
      role_Id: 1,
    };
    createUser({
      variables: {},
    });
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
      ) : (
        <LocationComponent />
      )}
      <div className="form-controller-btns">
        {activeIndex > 0 ? (
          <Button variant="outlined" onClick={prevStep}>
            Back
          </Button>
        ) : null}
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
          <Button variant="contained" onClick={() => handleCreateMemeber()}>
            Create Member
          </Button>
        )}
      </div>
    </div>
  );
}
