import axios from 'axios';

const execute = async (variables, query) => {
    const response = await axios.post("https://versus-betting.herokuapp.com/v1/graphql", {
        query: query,
        variables
    },
    {
        headers:{
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
        }
      })
    return { data: response.data };
};

const findUserByEmailOrUsername = `
    query FindUserByEmailOrUsername($username: String, $email: String) {
        main_users(where: {
    _or: [
    {username: {_eq: $username}},
    {email: {_eq: $email}}
    ]
    }) {
        email
        id
        password
        points
        username
        }
  }`;

const createUserWithLocalCredentials = `
mutation CreateUser($email: String, $password: String, $username: String) {
    insert_main_users_one(object: {email: $email, password: $password, points: 0, username: $username}) {
      id
      email
      username
      points
    }
  }
  `;

export const createUser = async (email, username,password) => {
    var { data } = await execute({ email, password, username }, createUserWithLocalCredentials);
    return data.data.insert_main_users_one;
}

export const findUserByEmailAndUsername = async (email, username) => {
    var { data } = await execute({ email, username },findUserByEmailOrUsername);
    return data;
}
