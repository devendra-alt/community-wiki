import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Business from '../business/index';
import './user.css';
import { useParams } from 'react-router-dom';
import EditUser from './actions/editUser';
import requestGetUserByID from './../../network/gql_requests/requestGetUserByID';

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
  const { id } = useParams();
  const [data, setUserData] = React.useState(null);
  const [businessInfoData, setBusinessInfoData] = React.useState(null);
  const [userProfile, setUserProfile] = React.useState({
    id: id,
    firstname: '',
    lastname: '',
    mobile: '',
    email: '',
  });

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedData = await requestGetUserByID(id);
        setUserData(fetchedData);
        setBusinessInfoData(
          fetchedData?.usersPermissionsUser?.data?.attributes?.business_profiles
            ?.data ?? []
        );
        const { firstname, lastname, mobile, email } =
          data?.usersPermissionsUser?.data?.attributes;
        setUserProfile({
          id: data?.usersPermissionsUser?.data.id,
          firstname,
          lastname,
          mobile,
          email,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [id]);

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
            {data && <EditUser data={data} />}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Business data={businessInfoData} user={userProfile} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}></CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
