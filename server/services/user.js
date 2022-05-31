import ApiError from "../exeptions/api-error.js"
import UserModel from "../models/user.js"

const isUserVerified = (user, password) => user.password === password

const createUser = async ({email, password}) => {
    const candidate = await UserModel.findOne({email})

    if (candidate) {
        throw ApiError.BadRequest(`User ${email} is exist`)
    }

    const newUser = await UserModel.create({email, password})

    return newUser._id
}

const userConfirmed = async ({email, password}) => {
    const candidate = await UserModel.findOne({email})

    if (!candidate) {
        throw ApiError.BadRequest(`User ${email} is exist`)
    }

    if (!isUserVerified(candidate, password)) {
        throw ApiError.BadRequest(`User ${email} is exist`)
    }

    return candidate
}

export {
    createUser,
    userConfirmed,
    
}