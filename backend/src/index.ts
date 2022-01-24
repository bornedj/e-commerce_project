import {createConnection} from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { User } from './entities/users';

//establishing the database connection with typeorm
const main = async () => {
   const conn = await createConnection({
       type: 'postgres',
       database: process.env.DBNAME,
       username: process.env.DBUSERNAME,
       password: process.env.DBPASSWORD,
       host: process.env.DBHOST,
       logging: true,
       port: 5432,
       synchronize: true,
       entities: [User]
   }) 

    //creating the app
    const app = express();
    const port = process.env.PORT || 4001;

    //adding middleware
    app.use(cors());
    app.use(morgan('tiny'));

    //listening
    app.listen(port, () => {
        console.log(`App listening on https://localhost:${port}`);
    })

}

main().catch(err => {
    console.log(err)
});