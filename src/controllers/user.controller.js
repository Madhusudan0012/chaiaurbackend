import { asyncHandler } from "../utils/asycHandler.js";

const registerUser = asyncHandler( async ( req, res)=>{
    res.status(400).json({
        message: "Madhusudan Singh chauhan "
    })
})

export {
    registerUser,
};
