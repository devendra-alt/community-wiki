import React, { useState } from 'react';
import FormSteppers from './stepperOverride';
import './style.css';
import { Button } from '@mui/material';
import GeneralInfo from './forms/generalInfo';
import WorkDetailsForm from './forms/shop';
import requestCreateAddress from './../../../network/gql_requests/requestCreateAddress';
import requestCreateUser from './../../../network/gql_requests/requestCreateUser';

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
  pinCode: Number('000000'),
  district: '',
  city: '',
  state: '',
  latitude: '',
  longitude: '',
  completAddress: '',
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
  size: '',
  state: '',
  latitude: '',
  longitude: '',
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

  const handleCreateMemeber = async () => {
    const addressData = await requestCreateAddress({
      name: 'PERSONAL_ADDRESS',
      district: formDataPersist[0].district,
      address_raw: formDataPersist[0].completAddress,
      latitude: parseFloat(formDataPersist[0].latitude),
      longitude: parseFloat(formDataPersist[0].longitude),
      pincode: parseInt(formDataPersist[0].pinCode),
      state: formDataPersist[0].state,
    });

    const userData = await requestCreateUser({
      firstname: formDataPersist[0].firstName,
      lastname: formDataPersist[0].lastName,
      sex: formDataPersist[0].gender,
      photo: formDataPersist[0].image.id,
      dob: new Date(formDataPersist[0].dob).toISOString().split('T')[0],
      username: formDataPersist[0].email.split('@')[0],
      email: formDataPersist[0].email,
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
      address_id: addressData.data?.createAddress?.data?.id,
    });

    if (formDataPersist[1].shopName === '') {
      return;
    }

    // const shopAddressData = await requestCreateAddress({
    //   name: 'SHOP_ADDRESS',
    //   district: formDataPersist[1].district,
    //   address_raw: formDataPersist[1].completAddress,
    //   latitude: parseFloat(formDataPersist[1].latitude),
    //   longitude: parseFloat(formDataPersist[1].longitude),
    //   pincode: parseInt(formDataPersist[1].pinCode),
    //   state: formDataPersist[1].state,
    // });

    // const shopData = await requestCreateShop({
    //   type: formDataPersist[1].businessType,
    //   subtype: formDataPersist[1].size,
    //   name: formDataPersist[1].shopName,
    //   startdate: formDataPersist[1].state,
    //   addresses: shopAddressData.data?.createAddress?.data?.id,
    // });
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
        ) : null}
        {activeIndex === 1 && (
          <Button variant="contained" onClick={nextStep}>
            Skip
          </Button>
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
          <Button variant="contained" onClick={() => handleCreateMemeber()}>
            Create Member
          </Button>
        )}
      </div>
    </div>
  );
}
