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
import { Button, Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import WorkDetailsForm from '../community/actions/forms/shop';
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

  const formData = [
    {},
    {
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
    },
    {},
  ];

  const [form, setForm] = useState(formData);

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
          >
            <Box
              sx={{
                background: '#fff',
                width: '80%',
                margin: '40px auto',
              }}
            >
              <WorkDetailsForm
                formDataPersist={form}
                setFormDataPersist={setForm}
              />
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
