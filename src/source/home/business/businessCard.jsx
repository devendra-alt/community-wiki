import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './businessCard.css';
import { Link } from 'react-router-dom';
import MapWithMultiplePins from './../../address/render/plot';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BusinessCard({ business, user }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    addresses,
    establised_date,
    logo,
    name,
    size,
    startdate,
    subtype,
    type,
  } = business.attributes;

  return (
    <Card
      sx={{ maxWidth: '90%', margin: '0 auto' }}
      style={{ marginTop: '2rem' }}
    >
      <CardHeader
        avatar={<></>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={subtype}
      />
      <CardContent>
        <div className="shop-card-details">
          <img
            src={logo.data[0].attributes.formats.thumbnail.url}
            alt=""
            width={'170px'}
            height={'170px'}
          />
          <div className="business-information">
            <div className="field">
              <p className="details-title">Business Name</p>
              <p>{name ?? 'User'}</p>
            </div>
            <div className="field">
              <p className="details-title">Owner Name</p>
              <p>
                <Link to="/user-details/:12">
                  {user.firstname + ` ` + user.lastname}
                </Link>
              </p>
            </div>
            <div className="field">
              <p className="details-title">Mobile</p>
              <p>{user.mobile ?? '917898852538'}</p>
            </div>
            <div className="field">
              <p className="details-title">Email</p>
              <p>{user.email ?? '917898852538'}</p>
            </div>
          </div>
          <div>
            <div className="actions">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAAV1BMVEX///8AAAAPDw/u7u7S0tIeHh7h4eHMzMwzMzPd3d1EREQiIiK7u7uqqqotLS38/PzDw8O0tLT29vZLS0s4ODjf398/Pz/n5+daWlokJCTAwMALCwtPT09F9MR/AAADgElEQVR4nO2c627aQBBGQ7BJnFBsSEPS0Pd/zqqeQeJD02W3+ALKOf/2ah2t5PHsLjw8AAAAAAAAAAAAAAAAAAAAJGmXpYTTpLoUP6EdSq5aFPIYTqN9tO2x9BEVcsghhxxyM8htLvdcidwyQ9VLLhcHSKFGLh/kepAzkAtArgCVC6NebW0DyYVRb4UccsghhxxyyCGHHHLI3btcNA455JBDDrl7lItPyPPlwqNxlUudgt/o1p6ulXIrW3spkItArge5Ar6D3OLxMvlyPkDlsp8w/4F/Uu5MtfQRyCGHHHK3J/ffN2WLS/kMdlMWAADKqezrXBOgVcb3vOIDveQhob48bjWunEXRWuVKg/BZLE/t6SnIIYcccnci1zY93espvidVW1tOjuQDbUCzsVLVnOKTdlL508eN6hiulS/nMkPO8dnCrb06Wquht/aQQw455AaTa+St/xbJ1RofrPIg7/DGu2opJbeSl//HOHIatjahXFR5dulLdTLkHkRn3AN/5JBDDrnr8Txga9MeojxgJT2dynoet5K8VtOBV0kH/ARgI7Gnk7aRgnjq0ldIfA04XEBdMk3rJvlCQe4U5JA7AbkCGnn5H60kBjgf8g7fWJd3b5SMYaEllXuXiKInxOMG8dSS5QTxkIxLXw5yBSDXgxxy/2Roud1TQDh7K126Z0HHh3J767mL5n6ztrUND7tMydkOnzaGcvlp3ewgh9xfkJuOu5BrngvZh3LaJyWnPf2QoLIY8GKVgx0bX3kNOIeMXwU6k3yhIIcccshdIfcrSg6UbUouzAq8tJf48CU9dYOoGjgruPLHgUe0q1bqkuVnd9eDXA9yBnIT8I3kwhxBrxW5nG4XPXlXn1QrOysdbLymA8rbOFlB8V+GnJFawDCIh6nbrfwfyhnIIYdcJsj1JOXWxovg4/dW2q5PCb/8u0TbjHJONPzIlNHbQa4HOeQmA7keldvpW99nk7f9OkPu8yXgPeo5pVwyn3My5PRaljN7EEcOOeSQuyC3Wwd0kVxrbX6AsNCI4CUffxC539bmG0Rd9MDZzwqceAG1FP6n7CQXF5DrQc5AbgK+g9wh+jpX9pFcqwmAxoBQ7svafsvcHhg+x8kK8klu7emShXKORu9JfvmIHHLIIXcFyx+FbMNptI+2ba2yjSqdnVTOsE8GAAAAAAAAAAAAAAAAAABwO/wB+1BpE6wkN7wAAAAASUVORK5CYII=" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Businees Details</Typography>
          <div className="business-details">
            <div className="business-information">
              <div className="field">
                <p className="details-title">Shop Type</p>
                <p>Retail{type}</p>
              </div>
              <div className="field">
                <p className="details-title">Sub Category</p>
                <p>{subtype}</p>
              </div>
              <div className="field">
                <p className="details-title">Business Sector</p>
                <p>{subtype}</p>
              </div>
              <div className="field">
                <p className="details-title">Start Date</p>
                <p>{startdate}</p>
              </div>
            </div>
          </div>
          <div className="location-details">
            <Typography paragraph>Businees Locations</Typography>
            <MapWithMultiplePins
              locations={[
                {
                  id: 9,
                  name: 'Innovative Film City',
                  latitude: 13.013,
                  longitude: 77.6262,
                },
              ]}
            />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
