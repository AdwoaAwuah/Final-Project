const User = require('../models/user');
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt')


const controller = {}


/**
 * Signup Controller
 * -------------------
 *
 * 1. Get the user input (data) ==> firstName, lastName, email, password
 * 2. Initialize a new user instance using our User model
 * 3. Add the data to the database (CREATE OPERATE) in mongoose
 *
 *
 * Object destructuring
 */


controller.signup = async (request, response) => {
    const {firstName, lastName, email, password} = request.body

    const user = new User({firstName, lastName, email, password})
    console.log(user)

    try {
        const newUser = await user.save()
       return response.send({message: "User Created Successfully", newUser})
    } catch (exception) {
       console.log(exception)
       return response.status(500).send({error: "internal server error"})
    }
}


/**
 * Algorithm
 * ---------------
 * 1. Get the user data (input) ===> email, password
 * 2. Find user with that email
 * 3. hash password the user provided and compare against password in db
 * 4. Send a response either
 *     --- Log user in
 *     --- Or send error response
 *
 * Logging user in
 * ---------------
 * We can either use the following
 * httpOnly cookie
 * send a token
 *
 *  1. Generate a token using user's email and id
 *  2. Set the Authorization cookie
 * *
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
controller.login = async (request, response) => {
    const {email, password} = request.body
    console.log(request.body)
    await User.findOne({email: email}, (error, user) => {
        if (error) {
           return response.status(500).send({error: "INTERNAL SERVER ERROR"})
       
        }
                
        if (!user) {
           return response.status(401).send({message: "Invalid Username or password"})
        }

        // Verify user password
        // user.checkPassword(password, (error, isMatch) => {
        //     error ? response.status(500).send({error: error}) : {}
        // })

        try {
            const valid = bcrypt.compareSync(request.body.password, user.password)
            if (!valid) {
               return response.status(401).send({message: "Invalid Username or password"})
            }

            // // Log user in
            const payload = {email: user.email, id: user.id}
            const token = jwt.sign(payload, process.env.JWT_SECRET)
            response.cookie("Authorization", `Bearer ${token}`, {httpOnly: true, maxAge: 86_400_000})

            response.send(user)

            response.send({message: "Login successfull"})
        } catch (exception) {
            console.log(exception)
           return response.status(500).send({error: "INTERNAL SERVER ERROR"})
        }

        
    })
}
//logout


module.exports = controller