import { gql } from '@apollo/client';

const GET_TEMPLES = gql`
  query getTemples {
    temples {
      data {
        id
        attributes {
          name
          logo {
            data {
              attributes {
                formats
              }
            }
          }
          address {
            data {
              attributes {
                addresstype
                housename
                landmark
                tehsil
                village
                district
                state
                pincode
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_TEMPLES;
