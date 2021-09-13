import {Router} from 'express';
import * as roulette from './controllers/roulette';
import  * as betting from './controllers/betting';
import {register, login} from './controllers/authenticate';
const routes = Router();

routes.get('/',(req,res)=>  res.json("teste"));
routes.get('/roulette/create',roulette.create);
routes.post('/roulette/start',roulette.startRoulette);
routes.post('/roulette/reducePoints', betting.reducePoints);
routes.post('/roulette/createBetting',betting.createBetting);
routes.post('/roulette/pay', roulette.payRoulette);
routes.post('/authenticate/register',register);
routes.post('/authenticate/login',login);

export default routes;