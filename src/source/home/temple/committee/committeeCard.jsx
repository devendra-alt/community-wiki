import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Avatar,
} from '@mui/material';

const CommitteeCard = ({ committee }) => {
  const { logo, name, memberCount, members } = committee;

  return (
    <Card variant="outlined">
      <CardHeader
        title={name}
        subheader={`Members: ${memberCount}`}
        avatar={
          <img
            src={logo}
            alt={`${name} Logo`}
            style={{ width: '40px', height: '40px' }}
          />
        }
      />
      <CardContent>{/* Other details about the committee */}</CardContent>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Members:
        </Typography>
        <Grid container spacing={1}>
          {members?.slice(0, 5).map((member, index) => (
            <Grid item key={index}>
              <Avatar alt={member.name} src={member.profileImage} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CommitteeCard;
