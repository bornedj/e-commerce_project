"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const users_1 = require("./resolvers/users");
const users_2 = require("./entities/users");
const products_1 = require("./resolvers/products");
const products_2 = require("./entities/products");
const cart_1 = require("./entities/cart");
const cartItems_1 = require("./entities/cartItems");
const orders_1 = require("./entities/orders");
const orderItems_1 = require("./entities/orderItems");
const carts_1 = require("./resolvers/carts");
const cartItems_2 = require("./resolvers/cartItems");
const orders_2 = require("./resolvers/orders");
const orderItems_2 = require("./resolvers/orderItems");
const redis_1 = require("redis");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const fs_1 = require("fs");
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: process.env.DBNAME,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        logging: ["error", "migration", "query"],
        port: 5432,
        synchronize: process.env.DEV,
        entities: [users_2.User, products_2.Product, cart_1.Cart, cartItems_1.CartItem, orderItems_1.OrderItems, orders_1.Order,],
        migrations: ["./migrations/*.ts"],
        migrationsRun: true,
        cli: {
            "migrationsDir": "./migrations"
        }
    });
    const app = (0, express_1.default)();
    const port = process.env.PORT || 4001;
    app.set('trust proxy', 1);
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = (0, redis_1.createClient)({
        legacyMode: true
    });
    redisClient.connect();
    redisClient.on('connect', () => {
        console.log('redis connected');
    });
    redisClient.on('error', (error) => {
        console.log(error);
    });
    app.use((0, cors_1.default)({
        credentials: true,
        origin: "https://studio.apollographql.com"
    }));
    app.use((0, morgan_1.default)('tiny'));
    app.use((0, express_session_1.default)({
        name: 'QID',
        store: new RedisStore({
            client: redisClient,
            disableTouch: false
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 3,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        },
        secret: (0, fs_1.readFileSync)('./key.pem', 'utf-8'),
        resave: false,
        saveUninitialized: false
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [users_1.UserResolver, products_1.ProductResolver, carts_1.CartResolver, cartItems_2.CartItemResolver, orders_2.OrderResolver, orderItems_2.OrderItemResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: { credentials: true, origin: "https://studio.apollographql.com" } });
    app.get('/', (req, res) => {
        req.session.userId = 15;
        res.send("hellow world");
    });
    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    });
};
main().catch(err => {
    console.log(err);
});
//# sourceMappingURL=index.js.map