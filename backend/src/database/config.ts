import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const databaseConfig = new Sequelize(
    process.env.DB_BASE!,
    process.env.DB_USER!,
    process.env.DB_PASS!, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: parseInt(process.env.DB_PORT!)
    }
);
