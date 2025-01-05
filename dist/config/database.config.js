"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'artshop',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    autoLoadEntities: true,
});
//# sourceMappingURL=database.config.js.map