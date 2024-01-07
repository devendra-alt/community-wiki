import gql from 'graphql-tag';

const CREATE_ADDRESS = gql`
  mutation (
    $name: String
    $district: String
    $address_raw: String
    $latitude: Float
    $longitude: Float
    $pincode: Int
    $state: String
  ) {
    createAddress(
      data: {
        addresstype: $name
        district: $district
        address_raw: $address_raw
        latitude: $latitude
        longitude: $longitude
        pincode: $pincode
        state: $state
      }
    ) {
      data {
        id
      }
    }
  }
`;

export default CREATE_ADDRESS;
