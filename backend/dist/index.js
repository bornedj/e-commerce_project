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
console.log("hello world");
const main = async () => {
    const orm = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: process.env.DBNAME,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        logging: true,
        port: 5432,
        synchronize: true,
        entities: []
    });
};
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.listen(port, () => {
    console.log(`App listening on https://localhost:${port}`);
});
main();
//# sourceMappingURL=index.js.map