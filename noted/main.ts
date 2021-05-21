import express from "express";
import expressSession from "express-session";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new pg.Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "localhost",
    port: 5432,
});

client.connect();

declare module "express-session" {
    export interface SessionData {
        user: { [key: string]: any };
    }
}

const app = express();

//middleware
app.use(
    expressSession({
        secret: "I GO TO SCHOOL BY BUS",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[info] method: [${req.method}], path: [${req.path}]`);
    next();
});

app.use((req, res, next) => {
    if (req.session["counter"]) {
        req.session["counter"] += 1;
    } else {
        req.session["counter"] = 1;
    }
    console.log(`[info] counter value: [${req.session["counter"]}]`);
    next();
});

import { taskRoutes } from "./routers/taskRoutes";
app.use(taskRoutes);

import { userRoutes } from "./routers/userRoutes";
app.use(userRoutes);

app.use(express.static(path.join(__dirname, "public")));


// const isLoggedIn = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     if (req.session && req.session.user) {
//         next();
//     } else {
//         res.status(401).redirect("/");
//     }
// };
// app.use(isLoggedIn, express.static("admin"));

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});

//root and postgre problem
