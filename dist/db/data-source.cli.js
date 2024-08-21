"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv/config");
const dataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    migrations: [__dirname + '/db/migrations/*.{js,ts}'],
    synchronize: false,
};
const dataSource = new typeorm_1.DataSource(dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.cli.js.map