import Users from "../model/userModel.js";

export const getAllUser = async (req, res) => {
    try {
        const users = await Users.find()

        res.status(200).json({
            status: "success",
            data: {
                users
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message
        })
    }
}