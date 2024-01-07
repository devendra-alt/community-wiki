import React from 'react';
import './allMembers.css';
import MemberCard from '../../user/memberCard';

export default function AllMembersList({ data }) {
  return (
    <section className="members-list">
      <ul className="members-list-data">
        {data?.map((value) => (
          <li>
            <MemberCard memberDetails={value} />
          </li>
        ))}
      </ul>
    </section>
  );
}
