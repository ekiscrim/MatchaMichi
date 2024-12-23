import Match from "../models/match.model.js";

const createMatch = async (tournamentId, round, video1, video2) => {
    const match = new Match({
        round,
        tournamentId,
        video1,
        video2
    });

    try {
        await match.save();
        return match;

    } catch (error) {
        return { error: "Internal Server Error" };
    }
}

const getMatchesByTournamentId = async (tournamentId) => {
    try {
        const matches = await Match.find({ tournamentId }).populate("tournamentId", "name");
        return matches;

    } catch (error) {
        return { error: "Internal Server Error" };
    }
}

const getMatchById = async (id) => {
    try {
        const match = await Match.findById(id);
        return match;
    } catch (error) {      
        return { error: "Internal Server Error" };
    }
}

const updateMatchWinner = async (id, winner) => {
    try {
        if (!["video1", "video2"].includes(winner)) {
            return { error: "Invalid winner" };
        }
        const updateMatch = await Match.findByIdAndUpdate(
            id,
            { winner, isCompleted: true },
            { new: true }
        );
        return updateMatch;
    } catch (error) {
        return { error: "Internal Server Error" };
    }
}

export default {
    createMatch,
    getMatchesByTournamentId,
    getMatchById,
    updateMatchWinner,
}