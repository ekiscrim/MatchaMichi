import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({username}).select("-password");
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
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        if (username && username !== user.username) {
            const usernameExist = await User.findOne({ username: username });
            if (usernameExist) {
              return res.status(409).json({ error: "El nombre de usuario ya existe" });
            }
            user.username = username;
          }

        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({error: "Please provide both current password and new password"});
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(404).json({error: "Current password is incorrect"});
            }
            if (newPassword.length < 6) {
                return res.status(400).json({error: "Password must be at least 6 characters long"});
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);

        }

        //TODO ENVIAR EMAILS
        user.email = email || user.email;
        user.username = username || user.username;

        user = await user.save();
        user.password = null; 

        return res.status(200).json(user);
        

    } catch (error) {
        console.log("Error in updateUserProfile: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
               
    }
};