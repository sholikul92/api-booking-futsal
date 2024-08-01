import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const createUser = async (body, hashPassword) => {
    const payload = {
        name: body.name,
        phoneNumber : body.phoneNumber,
        password : hashPassword
    }

    await prisma.user.create({
        data: payload
    })
}

const findAlluser = async () => {
    const data = await prisma.user.findMany();

    return data
}

const findUserByLogin = async (body) => {
    const data = await prisma.user.findUnique({
        where : {
            phoneNumber : body.phoneNumber
        }
    })

    return data
}

export {createUser, findAlluser, findUserByLogin}