const utilities = {}

/**
 * Return the authentication token from the cookie headers
 * @param request
 */
utilities.getAuthToken = request => {
    const cookie = request.headers.cookie
    if (!cookie) return null

    const authItem = cookie.split("; ").find(item=> item.startsWith("Authorization"))
    if (!authItem) return null

    const token = authItem.split("Authorization=Bearer%20")[1]
    if (!token) return null

    return token
}


module.exports = utilities