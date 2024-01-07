import { gql } from '@apollo/client';

const GET_USERS = gql`
  query {
    usersPermissionsUsers {
      data {
        id
        attributes {
          username
          email
          photo {
            data {
              id
              attributes {
                name
                formats
              }
            }
          }
          addresses {
            data {
              id
              attributes {
                latitude
                longitude
              }
            }
          }
          dob
          father
        }
      }
    }
  }
`;

export default GET_USERS;
