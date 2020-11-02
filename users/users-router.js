const express = require("express");
const { orWhereNotExists } = require("../../node-auth2-guided/database/config");
const router = express.Router();

router.post("/login", async (req, res)=>{
    try {

    } catch(err) {
        next(err)
    }
});

router.post("/register", async (req, res)=>{
    try {

    } catch(err) {
        next(err)
    }
});

router.get("/logout", async (req, res, next) => {
	try {
		// this will delete the session in the database and try to expire the cookie,
		// though it's ultimately up to the client if they delete the cookie or not.
		// but it becomes useless to them once the session is deleted server-side.
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router;