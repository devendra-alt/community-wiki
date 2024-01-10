import * as React from 'react';
import BusinessCard from './businessCard';
import './businessCard.css';

export default function Business({ data, user }) {
  return (
    <>
      {data?.map((business) => (
        <BusinessCard business={business} user={user} />
      ))}
    </>
  );
}
