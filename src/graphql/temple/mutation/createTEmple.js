import { gql } from '@apollo/client';

const CREATE_TEMPLE = gql`
  mutation createTemple(
        $name: String
        $startdate: Date
        $isHostel: Boolean
        $stay: Boolean
        $food: Boolean
        $addressId: ID
        $logo: [ID]
    ){
    createTemple(
        data:{
            name: $name
            startdate:$startdate
            is_hostel:$isHostel
            stay:$stay
            food:$food
            address:$addressId
            logo:$logo
        }
    
    ){
      data {
        id
         
      }
    }
  }
`;

export default CREATE_TEMPLE;
