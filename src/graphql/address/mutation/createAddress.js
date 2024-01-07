import gql from 'graphql-tag';

const CREATE_ADDRESS = gql`
  mutation (
    $addresstype: String
    $district: String
    $address_raw: String
    $latitude: Float
    $longitude: Float
    $pincode: Int
    $state: String
    $housename: String
    $landmark: String
  ) {
    createAddress(
      data: {
        addresstype: $addresstype
        district: $district
        address_raw: $address_raw
        latitude: $latitude
        longitude: $longitude
        pincode: $pincode
        state: $state
        housename: $housename
        landmark: $landmark
      }
    ) {
      data {
        id
      }
    }
  }
`;

export default CREATE_ADDRESS;
