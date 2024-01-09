import React, { useEffect, useState } from 'react';
import FormUI from './formUi';

export default function EditUser({ data }) {
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

  const {
    email,
    firstname,
    lastname,
    mobile,
    dob,
    sex: gender,
    education_level: education,
    father,
    marital,
    gotra,
  } = data?.usersPermissionsUser?.data?.attributes;

  const updatedData = {
    ...initData,
    image: data.usersPermissionsUser.data.attributes.photo
      ? data.usersPermissionsUser.data.attributes.photo.data
      : null,
    firstName: firstname ?? initData.firstName,
    lastName: lastname ?? initData.lastName,
    email: email ?? initData.email,
    mobile: mobile ?? initData.mobile,
    dob: dob ?? initData.dob,
    gender: gender ?? initData.gender,
    education: education ?? initData.education,
    marital_status: marital ?? initData.marital_status,
    husband_name: '', // The GraphQL response doesn't contain a field for husband's name
    father_name: father ?? initData.father_name,
    gotra: gotra ?? initData.gotra,
    father_gotra: '', // The GraphQL response doesn't contain a field for father's gotra
  };

  const [userFormData, setUserFormData] = useState(updatedData);

  console.log(userFormData);

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
