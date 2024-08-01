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
    const data = await prisma.user.findMany({
        select : {
            userID: true,
            name : true,
            phoneNumber : true
        }
    });

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

const findUserByToken = async (token) => {
    const data = await prisma.user.findMany({
        where : {
            refreshToken : token
        }
    })

    return data
}

const updateRefreshToken = async (phoneNumber, refreshToken) => {
    await prisma.user.update({
        data : {
            refreshToken: refreshToken
        },
        where: {
            phoneNumber: phoneNumber
        }
    })

}

// const updateRefreshTokenByID = async (refreshToken, userID) => {
//     await prisma.user.update({
//         data : {
//             refreshToken : refreshToken
//         },
//         where : {
//             userID : userID
//         }
//     })
// }

export {createUser, findAlluser, findUserByLogin, updateRefreshToken, findUserByToken}