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
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: process.env.DBNAME,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        logging: ["error", "migration", "query"],
        port: 5432,
        synchronize: true,
        entities: [users_2.User],
        migrations: ["./migrations/*.ts"],
        cli: {
            "migrationsDir": "migrations"
        }
    });
    const app = (0, express_1.default)();
    const port = process.env.PORT || 4001;
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [users_1.UserResolver, products_1.ProductResolver],
            validate: false
        })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('tiny'));
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