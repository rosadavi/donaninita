import express, { Request, Response } from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import path from 'path';
import { databaseConfig } from './src/database/config';
import usuario from './src/routes/usuario';
import dotenv from 'dotenv';
import { card } from './src/helpers/card';

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SECRET_SESSION!,
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

app.use((req: Request, res: Response, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

const __filename = path.join(process.cwd(), 'src', 'routes.ts');
const __dirname = path.dirname(__filename);
const viewsPath = path.join(__dirname, '../frontend/views');

app.set('view engine', 'handlebars');
app.set('views', viewsPath);

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../frontend/views/layouts'),
    runtimeOptions: {},
    helpers: {
        card: card
    }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, '../frontend/static')));

app.use('/', usuario);
// app.use('/', funcionario);

const PORT = process.env.PORT || 3000;

databaseConfig.authenticate()
    .then(() => {
        console.log("Banco de dados conectado com sucesso!✅");
    }).catch(e => {
        console.error("Erro ao se conectar com o banco de dados!❌", e);
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 🚀`);
});
