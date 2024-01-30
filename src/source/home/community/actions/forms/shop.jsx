import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Autocomplete,
} from '@mui/material';

import fetchGeoData from '../../../../address/webapi/getGeodetails';
import CreateAddress from '../../../../address/actions/create';
import requestCreateShop from '../../../../network/gql_requests/requestCreateShop';
import { GET_USERS_BY_TEMPLE } from '../../../../../graphql/user/query/getUsersByTemple';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';


const WorkDetailsForm = ({
  formDataPersist,
  setFormDataPersist,
  setAddressId,
  
}) => {
  const [occupation, setOccupation] = useState('');


  const location=useLocation()
  console.log(location);

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const { data } = useQuery(GET_USERS_BY_TEMPLE, {
    variables: { templeID: localStorage.getItem('templeId') },
  });
  // console.log(data);
  const [businessOwnerId,setBusineesOwnerId]=useState()

  const newArray = data?.usersPermissionsUsers.data.map(user =>
  ({
    label: user.attributes.firstname == null || user.attributes.lastname == null ? `${user.attributes.username}` : `${user.attributes.firstname} ${user.attributes.lastname}`,
    value: user.id,
    imageUrl:  user?.attributes?.photo?.data?.attributes?.formats?.thumbnail?.url ?? 'https://hphlms.s3.amazonaws.com/user_logo_18061e52bb.png'
  }));



  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    if (name === 'pinCode' && value.toString().length === 6) {
      try {
        const response = await fetchGeoData(value.toString());
        const data = response.data[0];
        setFormDataPersist((prevState) => {
          const updatedData = {
            ...prevState[1],
            [name]: value,
            district: data?.districtname ?? '',
            city: data?.city ?? '',
            state: data?.statename ?? '',
          };
          const updatedArray = prevState.map((obj, index) =>
            index === 1 ? updatedData : obj
          );
          return updatedArray;
        });
        // console.log(formDataPersist);
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    } else {
      setFormDataPersist((prevState) => {
        const updatedState = prevState.map((obj, index) => {
          if (index === 1) {
            return { ...obj, [name]: value };
          }
          return obj;
        });
        return updatedState;
      });

    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormDataPersist({ ...formDataPersist, multipleImages: files });
  };

  

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addAddressId, setAddAddressId] = useState();

  const consumerMarkets = [
    '',
    'Electronics Market',
    'Fashion and Apparel Market',
    'Home Appliances Market',
    'Beauty and Personal Care Market',
    'Grocery Market',
    'Furniture Market',
    'Sporting Goods Market',
    'Automobile Market',
  ];
  // console.log(new Date(formDataPersist[1].startdate).toISOString().split('T')[0]);

  const saveShop=()=>{
    
    if(addAddressId!=undefined){
      const shopMutationData={
        type: formDataPersist[1].businessType,
        subtype: formDataPersist[1].businessSubType,
        name: formDataPersist[1].shopName,
        startDate: new Date(formDataPersist[1].startdate).toISOString().split('T')[0],
        address: [addAddressId],
        turnover: Number(formDataPersist[1].turnover),
        templeId: localStorage.getItem('templeId'),
        userId:businessOwnerId

      }
      requestCreateShop(shopMutationData).then(()=>{
        // console.log("createdShop");
        setAddAddressId()
        setBusineesOwnerId()
        setFormDataPersist([{},
          {
            shopName: '',
            yearEstablished: '',
            multipleImages: [],
            defaultImage: '',
            businessType: '',
            businessSubType: '',
            jobType: '',
            startdate: '12/30/2000',
            turnover: 0,
          },
          {},])
      })
       

    }
  };

  return (
    <Container maxWidth="sm">
      {location.pathname==='/shops'?<FormControl>
        <h5>User</h5>
        <Autocomplete
          disablePortal
          id="user-selector"
          options={newArray}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select User" />}
          renderOption={(props, option) => (
            <li {...props}>
              <img
                src={option.imageUrl}
                alt={`Avatar of ${option.label}`}
                style={{ width: 24, height: 24, marginRight: 8, borderRadius: '50%' }}
              />
              {option.label}
            </li>
          )}
          onChange={(event, selectedOption) => {
            if (selectedOption) {
              // console.log(selectedOption.value); // Access the selected option's value
              setBusineesOwnerId(selectedOption.value)
            }

          }}
        ></Autocomplete>
      </FormControl>:null}
      <FormControl fullWidth margin="normal">
        <InputLabel>Occupation</InputLabel>
        <Select value={occupation} onChange={handleOccupationChange}>
          <MenuItem value="shopOwner">Shop Owner</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="job">Job</MenuItem>
        </Select>
      </FormControl>
      {occupation === 'shopOwner' && (
        <form>
          <TextField
            fullWidth
            label="Shop Name"
            name="shopName"
            value={formDataPersist[1]?.shopName}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Year Established"
            name="yearEstablished"
            value={formDataPersist[1]?.yearEstablished}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            variant="standard"
            label="Start Date"
            name="startdate"
            type="date"
            value={formDataPersist[1]?.startdate}
            onChange={handleInputChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={formDataPersist[1]?.businessType}
              onChange={handleInputChange}
              name="businessType"
            >
              <MenuItem value="" key={0}>
                None
              </MenuItem>
              <MenuItem value="RETAL" key={1}>
                RETAL
              </MenuItem>
              <MenuItem value="WHOLSALE" key={2}>
                WHOLESALE
              </MenuItem>
              <MenuItem value="SERVICE" key={3}>
                SERVICE
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>SubType</InputLabel>
            <Select
              value={formDataPersist[1]?.businessSubType}
              onChange={handleInputChange}
              name="businessSubType"
            >
              {consumerMarkets.map((market, index) => (
                <MenuItem key={index} value={market}>
                  {market}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Turnover"
            name="turnover"
            type="number"
            value={formDataPersist[1]?.turnover}
            onChange={handleInputChange}
            margin="normal"
          />
          <Button variant="outlined" onClick={() => setShowAddAddress(true)}>
            Add Address
          </Button>
          {location.pathname==='/shops'?<>{showAddAddress && (
            <CreateAddress
              setShowAddAddress={setShowAddAddress}
              setAddressId={setAddAddressId}
              addressType={'SHOP'}
            />
          )}</>:<>{showAddAddress && (
            <CreateAddress
              setShowAddAddress={setShowAddAddress}
              setAddressId={setAddressId}
              addressType={'SHOP'}
            />
          )}</>}
        </form>
      )}
      {occupation === 'business' && (
        <form>
          <TextField
            fullWidth
            label="Business Type"
            name="businessType"
            value={formDataPersist[1]?.businessType}
            onChange={handleInputChange}
            margin="normal"
          />
        </form>
      )}
      {occupation === 'job' && (
        <form>
          <TextField
            fullWidth
            label="Job Type"
            name="jobType"
            value={formDataPersist[1]?.jobType}
            onChange={handleInputChange}
            margin="normal"
          />
        </form>
      )}
      {location.pathname==='/shops'?<Grid item xs={12} md={6}>
        <Button
          disabled={addAddressId === undefined ? true : false}
          variant="outlined"
          onClick={() => saveShop()}
        >
          Save Shop
        </Button>
      </Grid>:null}
    </Container>
  );
};

export default WorkDetailsForm;
