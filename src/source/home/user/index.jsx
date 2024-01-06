import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonalInfo from './actions';
import BusinessCard from '../business/businessCard';
import './user.css';

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
            <PersonalInfo />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <BusinessCard />
          </CustomTabPanel>
          <CustomTabPanel va lue={value} index={2}></CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
