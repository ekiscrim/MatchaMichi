import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const getUserProfileByUsename = async (username) => {
    return await User.findOne({username}).select("-password");
};

const updateUserProfile = async (userId, updatedData) => {
    let user = await User.findById(userId);

    if (!user) {
        return { error: "User not found" };
    }

    if (updatedData.username && updatedData.username !== user.username) {
        const usernameExist = await User.findOne({ username: updatedData.username });
        if (usernameExist) {
          return { error: "The username already exists" };
        }
        user.username = updatedData.username;
      }

    if ((!updatedData.newPassword && updatedData.currentPassword) || (!updatedData.currentPassword && updatedData.newPassword)) {
        return { error: "Please provide both current password and new password" };
    }

    if (updatedData.currentPassword && updatedData.newPassword) {
        const isMatch = await bcrypt.compare(updatedData.currentPassword, user.password);
        if (!isMatch) {
            return { error: "Current password is incorrect" };
        }
        if (updatedData.newPassword.length < 6) {
            return { error: "Password must be at least 6 characters long" };
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(updatedData.newPassword, salt);
    }

    user.email = updatedData.email || user.email;
    user.username = updatedData.username || user.username;

    await user.save();

    return user;
};

export default {
    getUserProfileByUsename,
    updateUserProfile
}