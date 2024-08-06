import { findAllFields } from "../services/fields.service.js"
import { response } from "../utils/responseJson.js";

export const getFields = async (req, res) => {
    try {
        const fields = await findAllFields();
        res.status(200).json(response("success", 200, "get data successfully", fields))
        
    } catch (error) {
        res.status(500).json(response("failed", 500, error.message, null))
    }
}