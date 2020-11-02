const { JsonWebTokenError } = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
const roles = ["basic", "admin"]

function restrict(role) {
	return async (req, res, next) => {
		try {
			// commented this out in order to add the token instead of session
			// // express-session will automatically get the session ID from the cookie
			// // header, and check to make sure it's valid and the session for this user exists.
			// if (!req.session || !req.session.user) {
			// 	return res.status(401).json({
			// 		message: "Invalid credentials",
			// 	})
			// }

			// get the token value from a manual header and make sure its not empty
			// const token = req.headers.authorization

			//when using cookie parser
			//get the token value from a cookie which is autmatically sent from the client
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json({
					message: "invalid credentials",
				})
			}
			// make sure the signature on the token is valid and still mateches the payload
			// (we need to use the same secret string that was used to sign the token)
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						message: "invalid credentials"
					})
				}

				
				console.log(decoded)
				//make the tokens decoded payload available to the other middleware
				//functions or route handlers, incase we want to use it for something
				req.token = decoded
				
				//at this point, we know the token is valid and the user is authorized
				next()
			})

		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}