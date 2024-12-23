import UserService from "../services/user.service.js";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await UserService.getUserProfileByUsename(username);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
        console.log("Error in getUserProfile: ", error.message);
    }
};

export const updateUserProfile = async (req, res) => {
    const { email, username, currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    try {
        const updateUser = await UserService.updateUserProfile(userId, {email, username, currentPassword, newPassword});

        if (updateUser.error) {
            return res.status(404).json({error: updateUser.error});
        }

        return res.status(200).json(updateUser);
        
    } catch (error) {
        console.log("Error in updateUserProfile: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
               
    }
};