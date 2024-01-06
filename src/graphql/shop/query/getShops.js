import { gql } from '@apollo/client';

export const GET_SHOPS=gql`
    query getShops{
        businessProfiles{
            data{
                id
                attributes{
                    name
                    startdate
                    type
                    subtype
                    role
                    size
                    turnover
                    logo{
                        data{
                            attributes{
                                url
                            }
                        }
                        
                        
                    }
                }
            }
        }
    }
`