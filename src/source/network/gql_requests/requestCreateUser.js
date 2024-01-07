import { client } from '../../../auth/client';
import { CREATE_USER } from '../../../graphql/user/mutation/createUser';

const requestCreateUser = ({ userData }) => {
  try {
    const { data } = client.mutate({
      mutation: CREATE_USER,
      variables: userData,
    });
    return data;
  } catch (error) {
    console.log('error in creating user');
    console.log(error);
  }
};

export default requestCreateUser;
