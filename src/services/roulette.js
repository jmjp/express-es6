import axios from 'axios';
const createRouletteQuery = `
mutation CreateRoulette {
  insert_games_roulette_one(object: {}){
    id,
    unique_secure,
    stats
  }
}
`;

const findLastRoulette = `query MyQuery {
    games_roulette(where: {stats: {_eq: CREATED}}, order_by: {created_at: desc}) {
      id
      roll
      stats
    }
  }
  `;

const updateLastRoulette = `mutation UpdateRoulette($id: Int, $status: games_roulette_status_enum,$roll: Int) {
    update_games_roulette(_set: {stats: $status,roll: $roll}, where: {id: {_eq: $id}}) {
        returning {
            id
            roll
            stats
          }
    }
  }`;
const UpdateRouletteStatus = `mutation UpdateRoulette($id: Int, $status: games_roulette_status_enum) {
  update_games_roulette(_set: {stats: $status}, where: {id: {_eq: $id}}) {
      returning {
          id
          roll
          stats
        }
  }
}`;


const findLastFinishedRoulette = `query LastRoulette {
  games_roulette(limit: 1, order_by: {created_at: desc}, where: {stats: {_eq: FINISHED}}) {
    id
    roll
    stats
    created_at
    bettings {
      id
      amout
      payout_multiplier
      selected
      userByUser {
        id
        points
        username
      }
    }
  }
}
`;

const findLastAvaibleRoulette = `query MyQuery {
  games_roulette(where: {stats: {_eq: STARTED}}, order_by: {created_at: desc}) {
    id
    roll
    stats
  }
}
`;


const execute = async (variables, query) => {
    const response = await axios.post("https://versus-betting.herokuapp.com/v1/graphql",{
        query: query,
        variables
      },
      {
        headers:{
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
        }
      })
    return {data: response.data};
  };

  export const CreateRoulette = async () => {
      var {data} = await execute({},createRouletteQuery);
      return data;
  }

  export const FindLastRoulette = async () => {
      var {data} = await execute({},findLastRoulette);
      return data;
  }
  export const UpdateLastRoulette = async  (id,status) => {
    var {data} = await execute({id: id, status: status}, UpdateRouletteStatus);
    return data;
  }
  export const FinishRoulette = async (id,pickedNumber) => {
      var {data} = await execute({id: id, status: 'FINISHED', roll: pickedNumber}, updateLastRoulette);
      return data;
  }
  export const FindAvaibleRoulette = async () => {
    var {data} = await execute({},findLastAvaibleRoulette);
    return data;
}

  export const FindLastFinishedRoulette = async () => {
    var {data} = await execute({},findLastFinishedRoulette);
    return data;
  }



