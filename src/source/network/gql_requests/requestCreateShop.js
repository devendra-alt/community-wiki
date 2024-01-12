import { client } from '../../../auth/client';
import CREATE_SHOP from '../../../graphql/shop/mutation/createShop';
import GET_SHOP_PLOTS from '../../../graphql/shop/query/getShopPlots';
import { GET_SHOPS } from '../../../graphql/shop/query/getShops';

const requestCreateShop = async (shopData) => {
  try {
    const { data } = client.mutate({
      mutation: CREATE_SHOP,
      variables: shopData,
      refetchQueries:[
        {
          query:GET_SHOPS
        },
        {
          query:GET_SHOP_PLOTS
        }
      ]
      
    });
    return data;
  } catch (error) {
    console.log('error in creating shop!');
    console.error(error);
  }
};

export default requestCreateShop;
