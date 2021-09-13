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
  }
  )
  return { data: response.data };
};

const findUserPointsById = `query FindUserById ($id: int) {
  main_users(where: {id: {_eq: $id}}){
    points
  }
}
`;

const updatePoints = `
mutation UpdatePoints($id: Int,$points: float8) {
    update_main_users(where: {id: {_eq: $id}}, _set: {points: $points}) {
      returning {
        id
        username
        points
      }
    }
  }`;

export const UpdateUserPoints = async (id, points) => {
  var { data } = await execute({ id, points }, updatePoints);
  return data;
}

export const FindUserPointsById = async (id) => {
  var {data} = await execute({id},findUserPointsById);
  return data;
}