import axios from 'axios';

const execute = async (variables, query) => {
    const response = await axios.post("https://versus-betting.herokuapp.com/v1/graphql",{
        query: query,
        variables
      })
    return {data: response.data};
};

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

export const UpdateUserPoints = async (id,points) => {
    var {data} = await execute({id,points},updatePoints);
    return data;
}