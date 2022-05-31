import { Router } from "express";
import { COOKIE_KEY } from "../config/index.js";

import UserController from '../controllers/user.js'
import { isSessionAvailable } from "../services/session.js";

const router = new Router()


const authMiddleware = async (req, res, next) => {
    const sessionId = req?.cookies?.[COOKIE_KEY]

    if (!sessionId) {
        return res.status(403).json({status: 'error', message: 'Unregistered user'})
    }

    await isSessionAvailable(sessionId)

    next()
}

router.post('/login', UserController.login)
router.post('/registration', UserController.registration)
router.post('/logout', UserController.logout)
router.get('/users', authMiddleware, UserController.users)
router.get('/isAuth', UserController.isAuth)

export default router