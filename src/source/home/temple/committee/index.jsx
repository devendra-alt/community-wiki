import React from 'react';
import CommitteeCard from './committeeCard';
import './committee.css';

export default function Committiee() {
  const hinduCommittees = [
    {
      logo: 'https://via.placeholder.com/150', // Placeholder for committee1_logo.png
      name: 'Committee 1',
      memberCount: 25,
      members: [
        {
          name: 'Member 1',
          profileImage: 'https://via.placeholder.com/100', // Placeholder for member1_profile.png
        },
        {
          name: 'Member 2',
          profileImage: 'https://via.placeholder.com/100', // Placeholder for member2_profile.png
        },
        // Add more members as needed
      ],
    },
    {
      logo: 'https://via.placeholder.com/150', // Placeholder for committee2_logo.png
      name: 'Committee 2',
      memberCount: 18,
      members: [
        {
          name: 'Member A',
          profileImage: 'https://via.placeholder.com/100', // Placeholder for memberA_profile.png
        },
        {
          name: 'Member B',
          profileImage: 'https://via.placeholder.com/100', // Placeholder for memberB_profile.png
        },
        // Add more members as needed
      ],
    },
    // Add more committee objects as needed
  ];

  return (
    <div>
      <ul className="committee-list">
        {hinduCommittees.map((hindu, index) => (
          <li key={index}>
            <CommitteeCard committee={hindu} />
          </li>
        ))}
      </ul>
    </div>
  );
}
