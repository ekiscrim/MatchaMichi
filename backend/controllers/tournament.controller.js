import Tournament from "../models/tournament.model.js";
import TournamentService from "../services/tournament.service.js";

export const createTournament = async (req, res) => {
    try {
        const {name, description, videos, isRoundsSelected, selectedRounds} = req.body;

        if (!videos || videos.length < 2) {
            return res.status(400).json({error: "Please provide at least 2 videos"});
        }

        const maxRounds = Math.ceil(Math.log2(videos.length));

        const numberOfRounds = isRoundsSelected ? Math.min(selectedRounds, maxRounds) : maxRounds;

        const requiredVideos = Math.pow(2, numberOfRounds);
        const adjustedVideos = videos.slice(0, requiredVideos);

        const tournament = new Tournament({
            name,
            description,
            videos: adjustedVideos,
            numberOfRounds,
            isRoundsSelected: !!selectedRounds,
            creatorId: req.user._id,
        });

        await tournament.save();

        res.status(201).json({message: "Tournament created successfully", tournament});

    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const getTournament = async (req, res) => {
    try {
        const { id } = req.params;

        const tournament = await TournamentService.getTournamentById(id);

        if (!tournament) {
            return res.status(404).json({error: "Tournament not found"});
        }

        res.status(200).json(tournament);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const editTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedTournament = await TournamentService.editTournamentById(id, updatedData);

        if (updatedTournament.error) {
            return res.status(400).json({error: updatedTournament.error});
        }

        res.status(200).json(updatedTournament);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
};