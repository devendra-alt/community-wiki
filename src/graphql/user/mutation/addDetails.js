import { gql } from '@apollo/client';

export const ADD_USER_DETAILS = gql`
  mutation (
    $id: ID!
    $firstname: String
    $lastname: String
    $sex: String
    $photo: ID
    $dob: Date
    $mobile: Int
  ) {
    updateUsersPermissionsUser(
      id: $id
      data: {
        firstname: $firstname
        lastname: $lastname
        photo: $photo
        sex: $sex
        mobile: $mobile
        dob: $dob
      }
    ) {
      data {
        id
        attributes {
          username
        }
      }
    }
  }
`;
