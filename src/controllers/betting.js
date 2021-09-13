import * as playerService from '../services/players';
import { FindAvaibleRoulette } from '../services/roulette'; 


async function reducePoints(req,res){
    var betting  = req.body.event.data.new;
    var points  = await playerService.FindUserPointsById(betting.user);
    var calc = points.data.main_users[0].points - betting.amout;
    await playerService.UpdateUserPoints(betting.user,);
    return res.json({message: "success",user: points.data.main_users[0], currentPoints: calc});
}

async function createBetting(req,res){
    console.log(JSON.stringify(req.body));
    const bettingContent = req.body.input;
    const currentUser = req.body.session_variables["x-hasura-user-id"];
    var roulette = await FindAvaibleRoulette();
    var betting = {
        amout: bettingContent.amout,
        game_id: roulette.data.games_roulette[0],
        user: currentUser,
        selected: bettingContent.selected,
        payout_multiplier: bettingContent.selected == 'Green' ? 14 : 2
    }
    console.log(betting);
    return res.json({
        amout: 5,
        game_id: 1,
        id: 1,
    })
}

export{
    reducePoints,
    createBetting
}