import axios from 'axios';
const createBetting = `
mutation CreateBetting($amout: float8, $user: Int, $selected: games_betting_selected_enum, $game: Int,$multi: Int) {
    insert_games_betting(objects: {amout: $amout, user: $user, selected: $selected, game_id: $game, payout_multiplier: $multi}) {
      returning {
        amout
        selected
        payout_multiplier
        game_id
      }
    }
  }
  

`;

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
    console.log(JSON.stringify(response.data));
    return { data: response.data };
};

export const CreateBetting = async (amout,user,selected,game,multi) => {
    var { data } = await execute({ amout,user,selected,game,multi }, createBetting);
    return data;
}