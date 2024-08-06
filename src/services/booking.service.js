import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const createBooking = async (userID, fieldID, startTime, endTime, status) => {
    await prisma.bookings.create({
        data : {
            userID : userID,
            fieldID : fieldID,
            startTime : startTime,
            endTime : endTime,
            status : status
        }
    })
}