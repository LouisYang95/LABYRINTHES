import express from "express";

const router = express.Router();

router.get('/try', (req, res) => {
    res.send("What's up doc ?!");
})

export default router;
