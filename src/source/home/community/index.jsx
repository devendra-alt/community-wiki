import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllMembersList from './allMembers';
import AddMember from './actions/add';
import { Button, Modal } from '@mui/material';
import './style.css';
import { useQuery } from '@apollo/client';
import GET_USERS from './../../../graphql/user/query/getUsers';
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

export default function Community() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, error } = useQuery(GET_USERS);

  const dataSet = data?.usersPermissionsUsers?.data?.map((value) => {
    console.log(value);
    return {
      id: value.id,
      ...value.attributes,
    };
  });

  const [addMember, setAddMember] = React.useState(false);

  return (
    <section className="community-section">
      <Button variant="contained" onClick={() => setAddMember(true)}>
        Add Member
      </Button>
      <Modal
        open={addMember}
        onClose={() => setAddMember(false)}
        style={{ overflow: 'scroll' }}
      >
        {AddMember()}
      </Modal>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All Memebers" {...a11yProps(0)} />
            <Tab label="Commity Members" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AllMembersList data={dataSet} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllMembersList />
        </CustomTabPanel>
      </Box>
    </section>
  );
}
