import { client } from '../../../auth/client';
import { CREATE_USER } from '../../../graphql/user/mutation/createUser';

const requestCreateUser = async (userData) => {
  try {
    const { data, errors, loading } = await client.mutate({
      mutation: CREATE_USER,
      variables: userData,
    });
    return { data, errors, loading };
  } catch (error) {
    console.log('error in creating user');
    console.log(error);
  }
};

export default requestCreateUser;
