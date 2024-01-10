import gql from 'graphql-tag';

export const GET_PAYMENTS = gql`
  query getPayment($templeID: ID) {
    payments(filters: { temple: { id: { eq: $templeID } } }) {
      data {
        id
        attributes {
          payment_id
          amount_paid
          plan {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
