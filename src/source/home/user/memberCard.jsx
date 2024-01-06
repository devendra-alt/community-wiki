import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MemberCard() {
  const navigator = useNavigate();
  return (
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
  );
}
