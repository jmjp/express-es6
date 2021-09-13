import express from 'express';
import bodyParser from "body-parser";
import routes from './src/routes';
const app = express();
process.env.PORT = 8080;
process.env.SECRET_KEY = "linux123";

app.use(bodyParser.json());
app.use('/api',routes);

app.listen(process.env.PORT, () => {
    console.log(`running at port 8080`);
});