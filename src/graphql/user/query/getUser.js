import gql from 'graphql-tag';

const GET_USER = gql`
  query GET_USER($id: ID) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          firstname
          lastname
          father
          marital
          sex
          gotra
          myrole
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
          temples {
            data {
              id
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

export default GET_USER;
