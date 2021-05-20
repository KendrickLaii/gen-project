import express from "express";
import { Task } from "../models";
import { client } from "../main";

export const taskRoutes = express.Router();

taskRoutes.post("/tasks", async function (req, res) {
    try {
        await client.query(/*SQL*/ `INSERT INTO tasks (title, content, status, assign_to, due_date, is_deleted) VALUES ($1, $2, $3, $4, $5, $6);`, [
            req.body.title,
            req.body.content,
            req.body.status,
            req.body.assign_to,
            req.body.due_date,
            false,
        ]);
        console.log(req.body.title);
        console.log(req.body.content);
        console.log(req.body.status);
        console.log(req.body.assign_to);
        console.log(req.body.due_date);
        res.json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "internal sever error" });
    }
});

taskRoutes.get("/tasks", async function (req, res) {
    try {
        const result = await client.query(/*SQL*/ `SELECT * FROM tasks WHERE is_deleted = false;`);
        const tasks: Task[] = result.rows;
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "internal sever error" });
    }
});

taskRoutes.get("/tasks/:index", async function (req, res) {
    try {
        const index = parseInt(req.params.index);
        if (isNaN(index)) {
            res.status(400).json({ message: "index not a number" });
            return;
        }



        const result = await client.query(/*SQL*/ ` SELECT * FROM tasks WHERE id = $1`, [index]);
        console.log(result)
        const tasks: Task[] = result.rows;
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "internal sever error" });
    }
});


taskRoutes.delete("/tasks/:index", async function (req, res) {
    try {
        const index = parseInt(req.params.index);
        if (isNaN(index)) {
            res.status(400).json({ message: "index not a number" });
            return;
        }



        await client.query(/*SQL*/ ` DELETE FROM tasks WHERE id = $1`, [index]);
        res.json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "internal sever error" });
    }
});

taskRoutes.put("/tasks/:id", async function (req, res) {
    try {
        const taskID = parseInt(req.params.id);
        if (isNaN(taskID)) {
            res.status(400).json({ message: "invalid task id" });
            return;
        }



        await client.query(/*SQL*/ ` UPDATE tasks SET title = $1 SET content = $2 SET status = $3  SET assign_to = $4 SET due_date = $5 WHERE id = $6`, [
            req.body.title, 
            req.body.content, 
            req.body.status, 
            req.body.assign_to,
            req.body.due_date,
            taskID
        ]);
        res.json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "internal server error" });
    }
});
