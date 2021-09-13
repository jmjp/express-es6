import {Router} from 'express';
import * as roulette from './controllers/roulette';
const routes = Router();

routes.get('/',(req,res)=>  res.json("teste"));
routes.get('/roulette/create',roulette.create);
routes.post('/roulette/start',roulette.startRoulette);
routes.post('/roulette/pay', roulette.payRoulette);

export default routes;