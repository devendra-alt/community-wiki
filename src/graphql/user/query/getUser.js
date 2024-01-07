import gql from 'graphql-tag';

const GET_USER = gql`
  query GET_USER($id: ID) {
    usersPermissionsUser(id: $id) {
      data {
        attributes {
          username
          email
          myrole
          photo {
            data {
              id
              attributes {
                formats
              }
            }
          }
          temples {
            data {
              id
              attributes {
                name
              }
            }
          }
          addresses {
            data {
              attributes {
                addresstype
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_USER;
