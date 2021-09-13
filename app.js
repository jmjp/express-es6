import express from 'express';
import bodyParser from "body-parser";
import routes from './src/routes';
const app = express();

app.use(bodyParser.json());
app.use('/api',routes);

app.listen(process.env.PORT, () => {
    console.log(`running at port 8080`);
});