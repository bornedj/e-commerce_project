"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const users_1 = require("./entities/users");
const main = async () => {
    const conn = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: process.env.DBNAME,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        host: process.env.DBHOST,
        logging: true,
        port: 5432,
        synchronize: true,
        entities: [users_1.User]
    });
    const app = (0, express_1.default)();
    const port = process.env.PORT || 4001;
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('tiny'));
    app.listen(port, () => {
        console.log(`App listening on https://localhost:${port}`);
    });
};
main().catch(err => {
    console.log(err);
});
//# sourceMappingURL=index.js.map