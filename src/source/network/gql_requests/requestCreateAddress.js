import { client } from '../../../auth/client';
import CREATE_ADDRESS from '../../../graphql/address/mutation/createAddress';

const requestCreateAddress = async (addressData) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_ADDRESS,
      variables: addressData,
    });
    return data;
  } catch (error) {
    console.log('error in creating address!');
    console.log(error);
  }
};

export default requestCreateAddress;
