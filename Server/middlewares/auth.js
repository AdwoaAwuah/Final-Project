const jwt = require('jsonwebtoken')

const User = require('../models/user')
const {getAuthToken} = require('../helpers/utils')


const middlewares = {}

/**
 * Authenticate user and add user as a key to the request object to get request.user
 * @param request
 * @param response
 * @param next
 */
middlewares.authenticateUser = (request, response, next) => {
    const token = getAuthToken(request)
    let valid

    try {
        valid = jwt.verify(token, process.env.JWT_SECRET)
    } catch (exception) {
        valid = false
    }

    if (!valid) {
        request.isAuthenticated = false
        request.user = null
    }

    User.findOne({email: valid.email}, (error, user) => {
        if (error) {
             request.isAuthenticated = false
            request.user = null
            return;
        }
        request.user = user
        request.isAuthenticated = true
        return;
    })
}


module.exports = middlewares