import * as rouletteService from '../services/roulette';
import * as playerService from '../services/players';

export async function create(req, res, next) {
    var resp = await rouletteService.CreateRoulette();
    return res.json({response: resp});
}

export async function startRoulette(req,res,next){
    var created = await rouletteService.CreateRoulette();
    await sleep(2000);
    const id = created.data.insert_games_roulette_one.id;
    await rouletteService.UpdateLastRoulette(id,"STARTED");
    await sleep(12000);
    var randomNumber = Math.floor(Math.random() * 12);
    var finish = await rouletteService.FinishRoulette(id,randomNumber);
    return res.json(finish);
}

export async function payRoulette(req,res){
    var black = [1,2,3,4,5,6];
    var red = [7,8,9,10,11,12];
    var lastRoulette = await rouletteService.FindLastFinishedRoulette();
    const {id, bettings, stats, roll} = lastRoulette.data.games_roulette[0];
    if(black.includes(roll)){
        //paga preto
        var blacks = bettings.filter((value) => {
           return value.selected == "black";
        })
        for(const index in blacks){
            const {amout, payout_multiplier, userByUser} = blacks[index];
            var toPay = userByUser.points + (amout * payout_multiplier);
            await playerService.UpdateUserPoints(userByUser.id,toPay);
         }
    }else if(red.includes(roll)){
        //paga red
        var reds = bettings.filter((value) => {
            return value.selected == "red";
         })
         for(const index in reds){
            const {amout, payout_multiplier, userByUser} = reds[index];
            var toPay = userByUser.points + (amout * payout_multiplier);
            await playerService.UpdateUserPoints(userByUser.id,toPay);
         }
    }else{
        //paga verde
        var greens = bettings.filter((value) => {
            return value.selected == "green";
         })
         for(const index in greens){
            const {amout, payout_multiplier, userByUser} = greens[index];
            var toPay = userByUser.points + (amout * payout_multiplier);
            await playerService.UpdateUserPoints(userByUser.id,toPay);
         }
    }
    await rouletteService.UpdateLastRoulette(id,"PAID");
    return res.json(lastRoulette);
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  