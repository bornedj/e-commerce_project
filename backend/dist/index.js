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
const jwt_1 = require("./routes/jwt");
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
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('tiny'));
    app.use('/jwt', jwt_1.jwtRouter);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [users_1.UserResolver, products_1.ProductResolver, carts_1.CartResolver, cartItems_2.CartItemResolver, orders_2.OrderResolver, orderItems_2.OrderItemResolver],
            validate: false
        })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.get('/', (_, res) => {
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