import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser(
    $firstname: String
    $lastname: String
    $sex: String
    $photo: ID
    $dob: Date
    $mobile: Long
    $temples: [ID]
    $education_level: String
    $marital_status: String
    $father_name: String
    $husband_name: String
    $gotra: String
    $father_gotra: String
    $role_Id: ID
    $username: String
    $email: String
    $password: String
    $address_id: [ID]
  ) {
    createUsersPermissionsUser(
      data: {
        username: $username
        email: $email
        password: $password
        temples: $temples
        firstname: $firstname
        lastname: $lastname
        photo: $photo
        sex: $sex
        mobile: $mobile
        dob: $dob
        father: $father_name
        husband: $husband_name
        marital: $marital_status
        education_level: $education_level
        gotra: $gotra
        father_gotra: $father_gotra
        role: $role_Id
        addresses: $address_id
      }
    ) {
      data {
        id
        attributes {
          username
          email
        }
      }
    }
  }
`;
