import React from 'react';
import './allMembers.css';
import { useNavigate } from 'react-router-dom';
import MemberCard from '../../user/memberCard';

export default function AllMembersList() {
  return (
    <section className="members-list">
      <ul>
        <li>
          <MemberCard />
        </li>
      </ul>
    </section>
  );
}
