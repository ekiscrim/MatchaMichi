import matchService from "../services/match.service.js";

export const createMatch = async (req, res) => {
    try {
        const { tournamentId, round, video1, video2 } = req.body;

        if (!tournamentId || !round || !video1 || !video2) {
            return res.status(400).json({error: "Please provide all the required fields"});
        }

        const match = await matchService.createMatch(tournamentId, round, video1, video2);

        if (match.error) {
            return res.status(400).json({error: match.error});
        }

        res.status(201).json(match);

    }catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const getMatchesByTournamentId = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        const matches = await matchService.getMatchesByTournamentId(tournamentId);

        if (matches.error) {
            return res.status(400).json({error: matches.error});
        }

        res.status(200).json(matches);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const getMatchById = async (req, res) => {
    try {
        const { id } = req.params;

        const match = await matchService.getMatchById(id);

        if (match.error) {
            return res.status(400).json({error: match.error});
        }

        res.status(200).json(match);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const updateMatchWinner = async (req, res) => {
    try {
        const { id } = req.params;
        const { winner } = req.body;

        if (!winner) {
            return res.status(400).json({error: "Please provide the winner"});
        }

        const updatedMatch = await matchService.updateMatchWinner(id, winner);

        if (updatedMatch.error) {
            return res.status(400).json({error: updatedMatch.error});
        }

        res.status(200).json(updatedMatch);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
}