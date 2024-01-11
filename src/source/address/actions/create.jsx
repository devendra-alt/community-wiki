import React, { useState } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import fetchGeoData from '../webapi/getGeodetails';
import requestCreateAddress from '../../network/gql_requests/requestCreateAddress';

export default function CreateAddress({ setAddressId, addressType }) {
  const [addressFormData, setAdddressFormData] = useState({
    pinCode: Number('000000'),
    district: '',
    city: '',
    state: '',
    latitude: '',
    longitude: '',
    completAddress: '',
    addresstype: addressType,
  });

  const [error, setError] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'pinCode' && value.toString().length === 6) {
      try {
        const response = await fetchGeoData(value.toString());
        const data = response.data[0];
        setAdddressFormData((prevState) => {
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
      setAdddressFormData((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  };

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAdddressFormData((prevState) => {
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

  const saveAddress = async () => {
    console.log(addressFormData);
    const addressData = await requestCreateAddress(addressFormData);
    setAddressId(addressData?.createAddress?.data.id);
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="PIN CODE"
          name="pinCode"
          type="number"
          value={addressFormData.pinCode}
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
          value={addressFormData.completAddress}
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
          value={addressFormData.district}
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
          value={addressFormData.city}
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
          value={addressFormData.state}
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
          value={addressFormData.latitude}
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
          value={addressFormData.longitude}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button variant="outlined" onClick={() => saveAddress()}>
          Save Address
        </Button>
      </Grid>
    </>
  );
}
