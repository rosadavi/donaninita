import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Pedidos } from '../models/Pedidos';
import { Itens } from '../models/Itens';
import { Op } from 'sequelize';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET_SESSION!,
    resave: false,
    saveUninitialized: true
}));

const router = express.Router();