import 'reflect-metadata';
import {createConnection} from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { UserResolver } from './resolvers/users'
import { User } from './entities/users';
import { ProductResolver } from './resolvers/products';
import { Product } from './entities/products';
import { Cart } from './entities/cart';
import { CartItem } from './entities/cartItems';
import { Order } from './entities/orders';
import { OrderItems } from './entities/orderItems';
import { CartResolver } from './resolvers/carts';


const main = async () => {
    //establishing the database connection with typeorm
    const conn = await createConnection({
        type: 'postgres',
        database: process.env.DBNAME,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        logging: ["error", "migration", "query"],
        port: 5432,
        synchronize: false,
        entities: [User, Product, Cart, CartItem, OrderItems, Order,],
        migrations: ["./migrations/*.ts"],
        migrationsRun: true,
        cli: {
            "migrationsDir": "./migrations"
        }
    });

    //creating the app
    const app = express();
    const port = process.env.PORT || 4001;

    // setting up apollo for graphql
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, ProductResolver, CartResolver],
            validate: false
        })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    //adding middleware
    app.use(cors());
    app.use(morgan('tiny'));

    //hello world
    app.get('/', (_, res) => {
        res.send("hellow world")
    })

    //listening
    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    })

}

main().catch(err => {
    console.log(err)
});