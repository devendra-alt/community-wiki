import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_SHOPS } from '../../../graphql/shop/query/getShops';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ShopCard from './shopCard';
import MapWithMultiplePins from '../../address/render/plot';
import GET_SHOP_PLOTS from '../../../graphql/shop/query/getShopPlots';
import './shop.css';
import { Autocomplete, Button, FormControl, Grid, Modal, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import WorkDetailsForm from '../community/actions/forms/shop';
import { GET_USERS_BY_TEMPLE } from '../../../graphql/user/query/getUsersByTemple';
import requestCreateShop from '../../network/gql_requests/requestCreateShop';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Shops() {
  const { data } = useQuery(GET_SHOPS);
  const getPlots = useQuery(GET_SHOP_PLOTS);

  const data_ = getPlots?.data?.addresses?.data?.map((data, index) => {
    return {
      latitude: data?.attributes?.latitude,
      longitude: data?.attributes?.longitude,
      key: index,
      name: 'location1',
    };
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { userData } = useSelector((state) => state.auth);

  const [addShop, setAddShop] = useState(false);
  const [addMemberShop, setAddMemberShop] = useState(false);
  const [addAddressId, setAddAddressId] = useState();

  const { data: templeUsers } = useQuery(GET_USERS_BY_TEMPLE, {
    variables: { templeID: localStorage.getItem('templeId') },
  });
  // console.log(data);
  const [businessOwnerId, setBusineesOwnerId] = useState()

  const newArray = templeUsers?.usersPermissionsUsers.data.map(user =>
  ({
    label: user.attributes.firstname == null || user.attributes.lastname == null ? `${user.attributes.username}` : `${user.attributes.firstname} ${user.attributes.lastname}`,
    value: user.id,
    imageUrl: user?.attributes?.photo?.data?.attributes?.formats?.thumbnail?.url ?? 'https://hphlms.s3.amazonaws.com/user_logo_18061e52bb.png'
  }));

  const formData = [
    {},
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
    {},
  ];

  const [formDataPersist, setFormDataPersist] = useState(formData);


  const saveShop = () => {

    if (addAddressId != undefined) {
      const shopMutationData = {
        type: formDataPersist[1].businessType,
        subtype: formDataPersist[1].businessSubType,
        name: formDataPersist[1].shopName,
        startDate: new Date(formDataPersist[1].startdate).toISOString().split('T')[0],
        address: [addAddressId],
        turnover: Number(formDataPersist[1].turnover),
        templeId: localStorage.getItem('templeId'),
        userId: businessOwnerId

      }
      requestCreateShop(shopMutationData).then(() => {
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
    <Box sx={{ width: '100%' }}>
      {userData?.usersPermissionsUser?.data?.attributes?.myrole === 'ADMIN' ? (
        <>
          <Button
            variant="outlined"
            style={{ margin: '1rem' }}
            onClick={() => {
              console.log('hello');
              setAddMemberShop(true);
            }}
          >
            Add Member Shop
          </Button>
          <Modal
            open={addMemberShop}
            onClose={() => setAddMemberShop(false)}
            // style={{ overflow: 'scroll' }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            style={{ overflow: 'scroll' }}
          >
            <Box
              sx={{
                background: '#fff',
                width: '80%',
                margin: '40px auto',
              }}
            >

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

              <WorkDetailsForm
                formDataPersist={formDataPersist}
                setFormDataPersist={setFormDataPersist}
                setAddressId={setAddAddressId}
              />
              <Grid item xs={12} md={6}>
                <Button
                  disabled={addAddressId === undefined ? true : false}
                  variant="outlined"
                  onClick={() => saveShop()}
                >
                  Save Shop
                </Button>
              </Grid>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            style={{ margin: '1rem' }}
            onClick={() => setAddShop(true)}
          >
            Add Member Shop
          </Button>
        </>
      )}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="List" {...a11yProps(0)} />
          <Tab label="Show In Map" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <section className="members-list">
          <ul style={{ padding: '1rem' }}>
            {data?.businessProfiles.data.map((business, index) => {
              return (
                <li style={{ marginBottom: '1rem' }} key={index}>
                  <ShopCard business={business} />
                </li>
              );
            })}
          </ul>
        </section>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {data_ && <MapWithMultiplePins locations={[data_]} />}
      </CustomTabPanel>
    </Box>
  );
}
