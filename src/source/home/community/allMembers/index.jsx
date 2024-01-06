import React from 'react';
import './allMembers.css';

export default function AllMembersList() {
  return (
    <section className="members-list">
      <ul>
        <li>
          <div className="member-card">
            <img
              src="
https://fastercapital.com/images/people/colored/harish_muleva.jpg?t=1
"
            />
            <div className="memeber-info">
              <h3 className="memeber-name">Harish Muleva</h3>
              <p className="member-age flex">
                <span>Age</span>
                <span>51</span>
              </p>
              <p className="member-age flex">
                <span>Title</span>
                <span>Software Engineer,CEO</span>
              </p>
              <p className="address flex">
                <span>Address</span>
                <span>Chikkagubbi,Bengalore,562149</span>
              </p>
              <p className="occupation flex">
                <span>occupation</span>
                <span>Software Consultance and Services</span>
              </p>
              <p className="mobile flex">
                <span>Mobile</span>
                <span>9892819283</span>
              </p>
              //** details of occupation (render logo for related field's) */
              {/* <p className="no-of-shops flex">
                <span></span>
                <span></span>
              </p> */}
              <p className="location flex">
                <span>location</span>
                <span>current</span>
                //!** open pin highlight on map
              </p>
              <button>business</button>
              <button>address</button>
              <button>education</button>
              <button>Family</button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
