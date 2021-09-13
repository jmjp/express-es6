import * as playerService from '../services/players';


async function reducePoints(req,res){
    var betting  = req.body.event.data.new;
    var points  = await playerService.FindUserPointsById(betting.user);
    var calc = points.data.main_users[0].points - betting.amout;
    await playerService.UpdateUserPoints(betting.user,);
    return res.json({message: "success",user: points.data.main_users[0], currentPoints: calc});
}

async function createBetting(req,res){
    console.log(JSON.stringify(req.body));
    const currentUser = req.body.session_variables.x-hasura-user-id;
    console.log(currentUser);
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