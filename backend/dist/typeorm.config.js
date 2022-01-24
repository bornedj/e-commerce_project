"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormConfig = void 0;
exports.typeormConfig = {
    type: 'postgres',
    database: process.env.DBNAME,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    logging: ["error", "migration", "query"],
    port: 5432,
    synchronize: false,
    entities: ['./entities/*.ts'],
    migrations: ["./migrations/*.ts"],
    migrationsRun: true,
    cli: {
        "migrationsDir": "./migrations"
    }
};
//# sourceMappingURL=typeorm.config.js.map