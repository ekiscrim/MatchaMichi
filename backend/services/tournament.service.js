import Tournament from "../models/tournament.model.js";
import mongoose from "mongoose";

const getTournamentById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return { error: "Invalid tournament ID" };
    }

    return await Tournament.findById(id).populate("creatorId", "username");
};

const editTournamentById = async (id, updatedData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return { error: "Invalid tournament ID" };
    }

    try {
        const updatedTournament = await Tournament.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!updatedTournament) {
            return { error: "Tournament not found" };
        }

        return updatedTournament;
        
    } catch (error) {
        return { error: "Internal Server Error" };
    }
}

export default {
    getTournamentById,
    editTournamentById
};