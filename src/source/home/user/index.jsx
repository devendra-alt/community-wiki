import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Business from '../business/index';
import './user.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditUser from './actions/editUser';

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

export default function User() {
  const { state } = useLocation();

  const { data } = useSelector((state) => state.user);

  const businessInfoData =
    data?.usersPermissionsUser?.data?.attributes?.business_profiles?.data ?? [];

  console.log(data?.usersPermissionsUser?.attributes?.business_profiles);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="user-details">
      <div className="header">
        <img
          src="https://fastercapital.com/images/people/colored/harish_muleva.jpg?t=1"
          alt="profile-image"
          width="120px"
          height="150px"
          className="user-profile-image"
        />
      </div>
      <div className="detailed-view">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Personal Info" {...a11yProps(0)} />
              <Tab label="Business Info" {...a11yProps(1)} />
              <Tab label="Education Info" {...a11yProps(2)} />
              <Tab label="Address Info" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <EditUser data={data} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Business data={businessInfoData} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}></CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
