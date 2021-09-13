import * as playerService from '../services/players';
import * as bettingService from '../services/betting';
import { FindAvaibleRoulette } from '../services/roulette'; 


async function reducePoints(req,res){
    var betting  = req.body.event.data.new;
    var points  = await playerService.FindUserPointsById(betting.user);
    var calc = points.data.main_users[0].points - betting.amout;
    await playerService.UpdateUserPoints(betting.user,);
    return res.json({message: "success",user: points.data.main_users[0], currentPoints: calc});
}

async function createBetting(req,res){
    const bettingContent = req.body.input;
    const currentUser = req.body.session_variables["x-hasura-user-id"];
    var roulette = await FindAvaibleRoulette();
    if(roulette.data.games_roulette[0] == undefined){
        return res.status(400).json({message: "no roulette avaible"});
    }
    var points = await playerService.FindUserPointsById(currentUser);
    console.log(points);
    if(points.data.main_users[0].points < bettingContent.amount){
        return res.status(400).json({message: "you don't have points"});
    }
    var betting = {
        amout: bettingContent.amount,
        game_id: roulette.data.games_roulette[0],
        user: currentUser,
        selected: bettingContent.selected,
        payout_multiplier: bettingContent.selected == 'Green' ? 14 : 2
    }
    var createdBetting = await bettingService.CreateBetting(betting.amout,betting.user, betting.selected, betting.game_id, betting.payout_multiplier);
    console.log(createdBetting);
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