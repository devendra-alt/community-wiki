import { gql } from '@apollo/client';

export const GET_USERS_BY_TEMPLE=gql`
    query getUsersByTemple($templeID:ID){
        usersPermissionsUsers(filters:{temples:{id:{eq:$templeID}}}){
            data{
                id
                attributes{
                    username
                    email
                    firstname
                    lastname
                }
            }
        }
    }
`