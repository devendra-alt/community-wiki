import { gql } from '@apollo/client';

const GET_USERS = gql`
  query {
    usersPermissionsUsers {
      data {
        id
        attributes {
          firstname
          lastname
          father
          marital
          sex
          gotra
          email
          username
          mobile
          dob
          education_level
          photo {
            data {
              id
              attributes {
                name
                formats
              }
            }
          }
          business_profiles {
            data {
              id
              attributes {
                name
                type
                subtype
                name
                startdate
                establised_date
                size
                logo {
                  data {
                    id
                    attributes {
                      formats
                    }
                  }
                }
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
