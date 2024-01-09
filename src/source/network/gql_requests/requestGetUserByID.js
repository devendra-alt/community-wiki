import { client } from '../../../auth/client';
import GET_USER from './../../../graphql/user/query/getUser';

const requestGetUserByID = async (id) => {
  try {
    const { data } = await client.query({
      query: GET_USER,
      variables: { id },
    });
    return data;
  } catch (error) {
    console.log('error in getting user');
    console.log(error);
  }
};

export default requestGetUserByID;
