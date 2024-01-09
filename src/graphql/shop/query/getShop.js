import gql from 'graphql-tag';

const GET_SHOP = gql`
  query GetShop($id: ID) {
    businessProfile(id: $id) {
      data {
        id
        attributes {
          name
          logo {
            data {
              id
              attributes {
                formats
                url
              }
            }
          }
          startdate
          type
          establised_date
          subtype
          addresses {
            data {
              id
              attributes {
                addresstype
                address_raw
                latitude
                longitude
                pincode
                district
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_SHOP;
