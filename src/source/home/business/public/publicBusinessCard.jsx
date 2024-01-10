import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import GET_SHOP from '../../../../graphql/shop/query/getShop';
import './publicBusinessCard.css';
import MapWithMultiplePins from '../../../address/render/plot';

export default function PublicBusinessCard() {
  const { shopId } = useParams();
  const { data, loading, error } = useQuery(GET_SHOP, {
    variables: { id: shopId },
  });

  const businessProfileData = data?.businessProfile?.data?.attributes;
  const logoUrl = businessProfileData?.logo?.data[0]?.attributes?.url;

  const name = businessProfileData?.name;
  const type = businessProfileData?.type;
  const subtype = businessProfileData?.subtype;
  const startdate = businessProfileData?.startdate;

  const experience = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const differenceMs = today - date;
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = Math.floor(differenceMs / millisecondsPerYear);
    return years === 0 ? 1 : years;
  };

  return (
    <div className="public-business-profile">
      <div className="header-section">
        <img src={logoUrl} className="business-logo" />
      </div>
      <div className="business-info">
        <div className="businessname">
          <h5>{name}</h5>
          <p className="info-meta">Business Name</p>
        </div>
        <div className="businessname">
          <h5>{type}</h5>
          <p className="info-meta">Type</p>
        </div>
        <div className="businessname">
          <h5>{subtype}</h5>
          <p className="info-meta">Sub Category</p>
        </div>
        <div className="businessname">
          <h5>{startdate}</h5>
          <p className="info-meta">Start Date</p>
        </div>
        <div className="businessname">
          <h5>{experience(startdate)}</h5>
          <p className="info-meta">Experience</p>
        </div>
      </div>
      <div className="location-info">
        <div className="location-data">
          <h5>
            605506 <br></br> RdLingarajapuram, Bengaluru,<br></br> Karnataka
            560084
          </h5>
        </div>
      </div>
      <div className="address-map">
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
    </div>
  );
}
