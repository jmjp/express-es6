import * as playerService from '../services/players';


async function checkPost(req,res){
    var betting  = req.body.event.data.new;
    console.log(betting);
    console.log(betting.user);
    var points  = await playerService.FindUserPointsById(betting.user);
    console.log(points);
    await playerService.UpdateUserPoints(betting.user,(points.data.main_users[0].points - betting.amout));
    return res.json({message: "success"});
}

export{
    checkPost
}