import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const databaseConfig = new Sequelize(process.env.DB_URL!);