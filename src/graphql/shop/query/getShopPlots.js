import gql from 'graphql-tag';

const GET_SHOP_PLOTS = gql`
  query {
    addresses {
      data {
        id
        attributes {
          latitude
          longitude
        }
      }
    }
  }
`;

export default GET_SHOP_PLOTS;
