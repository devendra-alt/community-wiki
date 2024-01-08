import React, { useState } from 'react';
import FormUI from './formUi';
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
};

export default function CreateUser() {
  const [userFormData, setUserFormData] = useState(initData);
  
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userFormData);
    console.log('need to be submited!');
  };

  const educationOptions = [
    '10th pass',
    '12th pass',
    'Graduate',
    'Post-graduate',
    'Doctorate',
  ];

  return (
    <FormUI
      handleChange={handleChange}
      userFormData={userFormData}
      handleSubmit={handleSubmit}
      educationOptions={educationOptions}
    />
  );
}
