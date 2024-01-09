import gql from 'graphql-tag';

export const GET_PAYMENTS=gql`
    query {
        payments{
            data{
                id
                attributes{
                    payment_id
                    amount_paid
                }
            }
        }
    }
`