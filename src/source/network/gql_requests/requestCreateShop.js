import { client } from '../../../auth/client';
import CREATE_SHOP from '../../../graphql/shop/mutation/createShop';

const requestCreateShop = async ({ shopData }) => {
  try {
    const { data } = client.mutate({
      mutation: CREATE_SHOP,
      variables: shopData,
    });
    return data;
  } catch (error) {
    console.log('error in creating shop!');
    console.error(error);
  }
};

export default requestCreateShop;
