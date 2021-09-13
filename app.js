import express from 'express';
import routes from './src/routes';
const app = express();

app.use(express.json());
app.use('/api',routes);
app.use(express.urlencoded({ extended: true}))

app.listen(process.env.PORT, () => {
    console.log(`running at port 8080`);
});