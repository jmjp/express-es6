import * as playerService from '../services/players';


async function checkPost(req,res){
    var betting  = req.body.event.data.new;
    var points  = await playerService.FindUserPointsById(betting.user);
    console.log(points);
    await playerService.UpdateUserPoints(betting.user,(points.data.main_users[0].points - betting.amout));
    return res.json({message: "success"});
}

export{
    checkPost
}