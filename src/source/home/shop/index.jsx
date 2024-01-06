import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_SHOPS } from '../../../graphql/shop/query/getShops';
import ShopCard from './shopCard';


export default function Shops() {

  const { data } = useQuery(GET_SHOPS)

  console.log(data?.businessProfiles.data);



  return (
    <div>

      <section className="members-list">
        <ul style={{padding:"1rem"}}>
          {
            data?.businessProfiles.data.map((business,index) => {

              return (
                <li style={{marginBottom:"1rem"}} key={index}>
                  <ShopCard business={business} />
                </li>
              )
            })
          }

        </ul>
      </section>

    </div>);
}
