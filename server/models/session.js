import mongoose from "mongoose"
import { COOKIE_MAX_AGE } from "../config"

const SessionSchema = new mongoose.Schema({
    sessionId: {type: String, required: true, unique: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    createdAt: {type: Date, expires: COOKIE_MAX_AGE / 1000, default: Date.now}
})

export default mongoose.model('Session', SessionSchema)