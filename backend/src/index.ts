import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import { UserResolver } from "./resolvers/users";
import { User } from "./entities/users";
import { ProductResolver } from "./resolvers/products";
import { Product } from "./entities/products";
import { Cart } from "./entities/cart";
import { CartItem } from "./entities/cartItems";
import { Order } from "./entities/orders";
import { OrderItems } from "./entities/orderItems";
import { CartResolver } from "./resolvers/carts";
import { CartItemResolver } from "./resolvers/cartItems";
import { OrderResolver } from "./resolvers/orders";
import { OrderItemResolver } from "./resolvers/orderItems";
import { createClient } from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { readFileSync } from "fs";
import { MyContext } from "./types";

const main = async () => {
  //establishing the database connection with typeorm
  const conn = await createConnection({
    type: "postgres",
    database: process.env.DBNAME,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    logging: ["error", "migration", "query"],
    port: 5432,
    synchronize: process.env.DEV,
    entities: [User, Product, Cart, CartItem, OrderItems, Order],
    migrations: ["./migrations/*.ts"],
    migrationsRun: true,
    cli: {
      migrationsDir: "./migrations",
    },
  });

  //creating the app
  const app = express();
  const port = process.env.PORT || 4001;
  app.set("trust proxy", 1); // setting a proxy so that cookies can be sent to apollo server

  //creating redis connection for sessions
  const RedisStore = connectRedis(session);
  const redisClient = createClient({
    legacyMode: true,
  });
  redisClient.connect();
  redisClient.on("connect", () => {
    console.log("redis connected");
  });
  redisClient.on("error", (error) => {
    console.log(error);
  });

  //adding middleware
  app.use(
    cors({
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    })
  );
  app.use(morgan("tiny"));
  // app.use('/jwt', jwtRouter)

  // establishing session settings
  app.use(
    session({
      name: "QID",
      store: new RedisStore({
        client: redisClient,
        disableTouch: false,
      }),
      cookie: {
        // cookie expires after three hours
        maxAge: 1000 * 60 * 60 * 3,
        httpOnly: true,
        sameSite: "none", //csrf settings
        secure: true,
      },
      secret: readFileSync("./key.pem", "utf-8"),
      resave: false,
      saveUninitialized: false,
    })
  );

  // setting up apollo for graphql
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        ProductResolver,
        CartResolver,
        CartItemResolver,
        OrderResolver,
        OrderItemResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  //hello world
  app.get("/", (req, res) => {
    req.session.userId = 15;
    res.send("hellow world");
  });

  //listening
  app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
