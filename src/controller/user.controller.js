import { findAlluser, createUser, findUserByLogin } from "../services/user.js";
import { response } from '../utils/responseJson.js';
import { hashedPassword, comparePassword } from "../utils/hash.js";

const getAllUser = async (req, res) => {
    try {
        const data = await findAlluser();

        res.status(200).json(response("success", 200, "get data success", data))
    } catch (error) {
        res.status(500).json(response("failed", 500, "status internal server error", null))
    }
}

const registerUser = async (req, res) => {
    const payload = req.body;

    if(payload.password !== payload.confirmPassword) return res.status(400).json(response("failed", 400, "password tidak sama", null))
        
    try {
        const hashPassword = hashedPassword(payload.password)
        await createUser(req.body, hashPassword);
        res.status(201).json(response("success", 201, "register success", null))
    } catch (error) {
        res.status(400).json(response("failed", 400, error.message, null))
    }
}

const loginUser = async (req, res) => {
    const body = req.body;
    try {
        const data = await findUserByLogin(body);
        if (!data) return res.status(400).json(response("failed", 400, "Nomor telepon tidak terdaftar", null))

        const match = comparePassword(body.password, data.password);
        if (!match) return res.status(400).json(response("failed", 400, "password salah", null));

        res.status(200).json(response("success", 200, "login success", data))
    } catch (error) {
        res.status(400).json(response("failed", 400, error.message, null))
    }
}

export {getAllUser, registerUser, loginUser}