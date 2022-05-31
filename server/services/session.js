import {v4 as uuidv4} from 'uuid'
import ApiError from '../exeptions/api-error.js'
import Session from '../models/session.js'
import User from '../models/user.js'

const createSession = async (user) => {
    const newSession = await Session.create({
        sessionId: uuidv4(),
        userId: user._id,
    })

    return newSession
}

const clearSession = async (sessionId) => {
    const session = await Session.findOne({
        sessionId
    })

    if (!session) {
        return true
    }

    await session.deleteOne()

    return true
}

const isSessionAvailable = async (sessionId) => {
    const session = await Session.findOne({
        sessionId
    })

    if (!session) {
        throw ApiError.UnathorizedError('Session not found')
    }

    return true
}

const userBySessionId = async (sessionId) => {
    const session = await Session.findOne({
        sessionId
    })

    if (!session) {
        throw ApiError.UnathorizedError('Session not found')
    }

    const user = await User.findById(session.userId)

    if (!user) {
        throw ApiError.UnathorizedError('User`s session didn\'t found')
    }

    return user
}


export {
    createSession,
    clearSession,
    isSessionAvailable,
    userBySessionId
}