import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BusinessCard from '../business/businessCard';
import './temple.css';
import { Button } from '@mui/material';
import Committiee from './committee';
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
  const memberDetails = null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function calculateAge(birthDate) {
    const today = new Date();
    const dob = new Date(birthDate);

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return isNaN(age) ? 50 : age;
  }

  return (
    <div className="temple-details">
      <div className="header">
        <img
          src="
data:image/jpeg;base64,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          "
          alt="profile-image"
          width="120px"
          height="150px"
          className="user-profile-image"
        />
        <div className="t-stats">
          <p className="t-stat-data">
            <span>Temple Name</span>
            <span>Shree Aai mata mandir</span>
          </p>
          <p className="t-stat-data">
            <span>Address</span>
            <span>
              375, Aaimata Temple Rd, Kanakadasa Layout, Lingarajapuram,
              Bengaluru, Karnataka 560084
            </span>
          </p>
          <p className="t-stat-data">
            <span>Mobile</span>
            <span>+91-7898852538</span>
          </p>
        </div>
        <div></div>
      </div>
      <div className="detailed-view">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="trustee" {...a11yProps(1)} />
              <Tab label="Committee" {...a11yProps(0)} />
              <Tab label="Collection" {...a11yProps(2)} />
              <Tab label="Donation" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {Array.from([1, 2, 3]).map((value, index) => (
              <div className="member-card">
                <img
                  src={
                    memberDetails?.photo?.data?.attributes?.formats?.thumbnail
                      ?.url ??
                    ' https://fastercapital.com/images/people/colored/harish_muleva.jpg?t=1'
                  }
                  width={'244px'}
                />
                <div className="memeber-info">
                  <h3 className="memeber-name">
                    {memberDetails?.username ?? 'USER'}
                  </h3>
                  <p className="member-age flex">
                    <span>Age</span>
                    <span>{calculateAge(memberDetails?.dob)}</span>
                  </p>
                  <p className="member-age flex">
                    <span>Title</span>
                    <span>Software Engineer,CEO</span>
                  </p>
                  <p className="address flex">
                    <span>Address</span>
                    <span>
                      {memberDetails?.address ?? 'Chikkagubbi,Bengalore,562149'}
                    </span>
                  </p>
                  <p className="occupation flex">
                    <span>occupation</span>
                    <span>Software Consultance and Services</span>
                  </p>
                  <p className="mobile flex">
                    <span>Mobile</span>
                    <span>9892819283</span>
                  </p>
                  <p className="location flex">
                    <span>location</span>
                    <span>current</span>
                  </p>
                  <div className="user-card-actions">
                    <Button className="user-card-action-btn">business</Button>
                    <Button className="user-card-action-btn">address</Button>
                    <Button className="user-card-action-btn">education</Button>
                    <Button className="user-card-action-btn">Family</Button>
                  </div>
                </div>
                <div className="actions">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAAV1BMVEX///8AAAAPDw/u7u7S0tIeHh7h4eHMzMwzMzPd3d1EREQiIiK7u7uqqqotLS38/PzDw8O0tLT29vZLS0s4ODjf398/Pz/n5+daWlokJCTAwMALCwtPT09F9MR/AAADgElEQVR4nO2c627aQBBGQ7BJnFBsSEPS0Pd/zqqeQeJD02W3+ALKOf/2ah2t5PHsLjw8AAAAAAAAAAAAAAAAAAAAJGmXpYTTpLoUP6EdSq5aFPIYTqN9tO2x9BEVcsghhxxyM8htLvdcidwyQ9VLLhcHSKFGLh/kepAzkAtArgCVC6NebW0DyYVRb4UccsghhxxyyCGHHHLI3btcNA455JBDDrl7lItPyPPlwqNxlUudgt/o1p6ulXIrW3spkItArge5Ar6D3OLxMvlyPkDlsp8w/4F/Uu5MtfQRyCGHHHK3J/ffN2WLS/kMdlMWAADKqezrXBOgVcb3vOIDveQhob48bjWunEXRWuVKg/BZLE/t6SnIIYcccnci1zY93espvidVW1tOjuQDbUCzsVLVnOKTdlL508eN6hiulS/nMkPO8dnCrb06Wquht/aQQw455AaTa+St/xbJ1RofrPIg7/DGu2opJbeSl//HOHIatjahXFR5dulLdTLkHkRn3AN/5JBDDrnr8Txga9MeojxgJT2dynoet5K8VtOBV0kH/ARgI7Gnk7aRgnjq0ldIfA04XEBdMk3rJvlCQe4U5JA7AbkCGnn5H60kBjgf8g7fWJd3b5SMYaEllXuXiKInxOMG8dSS5QTxkIxLXw5yBSDXgxxy/2Roud1TQDh7K126Z0HHh3J767mL5n6ztrUND7tMydkOnzaGcvlp3ewgh9xfkJuOu5BrngvZh3LaJyWnPf2QoLIY8GKVgx0bX3kNOIeMXwU6k3yhIIcccshdIfcrSg6UbUouzAq8tJf48CU9dYOoGjgruPLHgUe0q1bqkuVnd9eDXA9yBnIT8I3kwhxBrxW5nG4XPXlXn1QrOysdbLymA8rbOFlB8V+GnJFawDCIh6nbrfwfyhnIIYdcJsj1JOXWxovg4/dW2q5PCb/8u0TbjHJONPzIlNHbQa4HOeQmA7keldvpW99nk7f9OkPu8yXgPeo5pVwyn3My5PRaljN7EEcOOeSQuyC3Wwd0kVxrbX6AsNCI4CUffxC539bmG0Rd9MDZzwqceAG1FP6n7CQXF5DrQc5AbgK+g9wh+jpX9pFcqwmAxoBQ7svafsvcHhg+x8kK8klu7emShXKORu9JfvmIHHLIIXcFyx+FbMNptI+2ba2yjSqdnVTOsE8GAAAAAAAAAAAAAAAAAABwO/wB+1BpE6wkN7wAAAAASUVORK5CYII=" />
                  <button
                    className="seeDetails-btn"
                    onClick={() => navigator('/user-details/:1')}
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Committiee />
          </CustomTabPanel>
          <CustomTabPanel va lue={value} index={2}></CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}
