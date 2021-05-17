import express from "express";
import { User } from "../models";
import { client } from "../main";

export const userRoutes = express.Router();

userRoutes.post("/login", async function (req, res) {
    try {
        const result = await client.query<User>(/*SQL*/ `SELECT * FROM users WHERE username = $1`, [req.body.username]);
        const user = result.rows[0];

        if (!user || user.password !== req.body.password) {
            res.status(401).json({ message: "invalid username or password" });
            return;
        }

        if (req.session) {
            req.session.user = { id: user.id };
        }
        res.json({ message: "success" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "internal sever error" });
    }
});
