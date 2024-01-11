const { default: gql } = require('graphql-tag');

const CREATE_SHOP = gql`
  mutation (
    $type: String
    $subtype: String
    $name: String
    $startdate: Date
    $address: [ID]
    $userId: ID
    $templeId: ID
    $turnover: Int
  ) {
    createBusinessProfile(
      data: {
        type: $type
        subtype: $subtype
        name: $name
        startdate: $startdate
        addresses: $address
        userid: $userId
        temple: $templeId
        turnover: $turnover
      }
    ) {
      data {
        id
      }
    }
  }
`;

export default CREATE_SHOP;
