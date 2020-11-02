const express = require("express");
const { orWhereNotExists } = require("../../node-auth2-guided/database/config");
const router = express.Router();

router.post("/login", async (req, res)=>{
    try {

    } catch(err) {
        next(err)
    }
});

router.post("/signup", async (req, res)=>{
    try {

    } catch(err) {
        next(err)
    }
});

module.exports = router;