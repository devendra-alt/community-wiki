import React, { useState } from 'react';
import FormSteppers from './stepperOverride';
import './style.css';
import { Button } from '@mui/material';
import GeneralInfo from './forms/generalInfo';
import WorkDetailsForm from './forms/shop';
import requestCreateUser from './../../../network/gql_requests/requestCreateUser';
import requestCreateShop from './../../../network/gql_requests/requestCreateShop';

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
  businessSubType: '',
  jobType: '',
  startdate: '',
  turnover: 0,
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

  const [addressId, setPersonalAddressId] = useState(0);
  const [shopAddressId, setShopAddressId] = useState(0);

  const handleCreateMemeber = async () => {
    const userFormData = {
      firstname: formDataPersist[0]?.firstName,
      lastname: formDataPersist[0]?.lastName,
      sex: formDataPersist[0]?.gender,
      dob: new Date(formDataPersist[0]?.dob).toISOString().split('T')[0],
      username: formDataPersist[0]?.email.split('@')[0],
      email: formDataPersist[0]?.email,
      password: 'Welcome@123',
      mobile: Number(formDataPersist[0]?.mobile),
      temples: localStorage.getItem('templeId'),
      education_level: formDataPersist[0]?.education,
      marital_status: formDataPersist[0]?.marital_status,
      father_name: formDataPersist[0]?.father_name,
      husband_name: formDataPersist[0]?.husband_name,
      gotra: formDataPersist[0]?.gotra,
      father_gotra: formDataPersist[0]?.father_gotra,
      role_Id: 1,
    };

    if (addressId) {
      userFormData.address_id = addressId;
      console.log('hello');
    }

    if (formDataPersist[0]?.image) {
      userFormData.photo = formDataPersist[0]?.image;
    }

    const userData = await requestCreateUser(userFormData);

    console.log();

    if (formDataPersist[1].shopName === '') {
      return;
    }

    const userShopData = {
      type: formDataPersist[1].businessType,
      subtype: formDataPersist[1].businessSubType,
      name: formDataPersist[1].shopName,
      startdate: formDataPersist[1].startdate,
      templeId: localStorage.getItem('templeId'),
    };

    if (shopAddressId) {
      userShopData.addresses = shopAddressId;
    }

    if (userData?.createUsersPermissionsUser?.data?.id) {
      userShopData.userId = userData?.createUsersPermissionsUser?.data?.id;
    }
    const shopData = await requestCreateShop(userShopData);
  };

  return (
    <div className="add-container">
      <FormSteppers activeIndex={activeIndex} />
      {activeIndex === 0 ? (
        <GeneralInfo
          formDataPersist={formDataPersist}
          setFormDataPersist={setFormDataPersist}
          setAddressId={setPersonalAddressId}
        />
      ) : activeIndex === 1 ? (
        <WorkDetailsForm
          formDataPersist={formDataPersist}
          setFormDataPersist={setFormDataPersist}
          setAddressId={setShopAddressId}
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
