import { gql } from '@apollo/client';

const GET_PLANS = gql`
  query getPlans($templeID: ID) {
    plans(filters: { temple: { id: { eq: $templeID } } }) {
      data {
        id
        attributes {
          plan_name
          amount
          start
          end
          description
        }
      }
    }
  }
`;

export default GET_PLANS;
