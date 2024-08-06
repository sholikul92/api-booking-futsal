import { findUserByToken } from "../services/user.service.js";
import { createBooking } from "../services/booking.service.js";
import {response} from '../utils/responseJson.js'

export const bookings = async (req, res) => {
    const { fieldID, date, startTime, endTime } = req.body;

    const startDateTime = new Date(`${date}T${startTime}.00Z`);
    const endDateTime = new Date(`${date}T${endTime}.00Z`);

    if (!(fieldID, date, startTime, endTime)) res.status(400).json(response('failed', 400, 'data tidak boleh kosong', null))

    const token = req.cookies.refreshToken
    if(!token) return res.json("token not found");

    try {
        const user = await findUserByToken(token);
        const userID = user[0].userID

        await createBooking(userID, fieldID, startDateTime, endDateTime, 'booked')
        res.json("booking success")
    } catch (error) {
        res.json(error.message)
    }
}