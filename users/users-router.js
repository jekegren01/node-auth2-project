const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const { restrict } = require("./users-middleware")
const router = express.Router();

router.get("/users", restrict(), async (req, res) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res)=>{
    try {
        const { username, password } = req.body
		const user = await Users.findByUsername(username)
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
        }
        const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
        }
        const token = jwt.sign({
			userID: user.id,
			userDepartment: user.department,

        }, process.env.JWT_SECRET)

        res.cookie("token", token)

		res.json({
			message: `Welcome ${user.username}!`,
			// token: token,
		})
        
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