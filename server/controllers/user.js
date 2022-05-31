import { createUser, userConfirmed } from "../services/user.js"
import { clearSession, createSession, isSessionAvailable, userBySessionId } from "../services/session.js"
import { COOKIE_KEY, COOKIE_MAX_AGE } from "../config/index.js"
import ApiError from "../exeptions/api-error.js"

const registration = async (req, res, next) => {
    try {
        const userId = await createUser(req.body)

        return res.json({userId})
    } catch (error) {
        next(error)
    }
}
const login = async (req, res, next) => {
    try {
        const user = await userConfirmed(req.body)

        if (user) {
            const session = await createSession(user)
            
            // TODO: create in monog maxAge and expires property
            res.cookie(COOKIE_KEY, session.sessionId, {
                maxAge: COOKIE_MAX_AGE,
                httpOnly: true,
            })
            
            return res.json({status: 'success'})
        }
    } catch (error) {
        next(error)
    }
}
const logout = async (req, res, next) => {
    try {
        const sessionId = req.cookies[COOKIE_KEY]

        if (!sessionId) {
            return res.json({status: 'success', message: 'Already logouted'})
        }
        
        await clearSession(sessionId)

        return res.json({status: 'success'})
    } catch (error) {
        next(error)
    }
}
const users = async (req, res, next) => {
    try {
        res.json(['user1', 'user2'])
    } catch(error) {
        next(error)
    }
}

const isAuth = async (req, res, next) => {
    try {
        const sessionId = req?.cookies?.[COOKIE_KEY]

        if (!sessionId) {
            throw ApiError.UnathorizedError('Unregistered user')
        }

        const isAvailable = await isSessionAvailable(sessionId)

        if (!isAvailable) {
            throw ApiError.UnathorizedError('Unregistered user')
        }
        
        const user = await userBySessionId(sessionId)

        return res.json({status: 'success', data: user})
    } catch (error) {
        next(error)
    }
}
const user = {
    registration,
    login,
    logout,
    users,
    isAuth
}

export default user