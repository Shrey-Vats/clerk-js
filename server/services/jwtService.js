import jwt from 'jsonwebtoken'

export const signAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.JWT_SECERT)
    return token
}

/**
 * Verifies the given access token.
 * 
 * @param {string} token the access token to verify
 * @returns {object} the decoded token if it is valid, or null if it is invalid
 */
export const verifyAccessToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECERT);

        return decodedToken;
    } catch (error) {
        return null;
    }
}
