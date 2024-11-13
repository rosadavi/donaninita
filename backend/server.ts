import express, {Request, Response} from 'express';
import handleabars from 'express-handlebars';
import session from 'express-session';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import connectRedis from 'connect-redis'
import path from 'path';
import { createClient } from 'redis';
import { databaseConfig } from './src/database/config';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient();

redisClient.connect().catch(console.error);

const RedisStore = new connectRedis({client: redisClient});

const app = express();

app.use(session({
    secret: process.env.SECRET_SESSION!,
    resave: false,
    saveUninitialized: true,
    store: RedisStore
}));

app.use(flash());

app.use((req: Request, res: Response, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.engine('handlebars', handleabars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

app.set('view engine', 'handlebars');

const __filename = path.join(process.cwd(), 'src', 'routes.ts');
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/public')));
app.use((req: Request, res: Response, next) => {
    next();
});

// app.use('/', index);
// app.use('/', funcionario);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const PORT = process.env.PORT || 3333;

databaseConfig.authenticate()
    .then(() => {
        console.log("Banco de dados conectado com suecesso!✅")
}).catch(e => {
    console.error("Erro ao se conectar com o banco de dados!❌", e)
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}🚀`);
});