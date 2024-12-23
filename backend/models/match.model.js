import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    round: {
        type: Number,
        required: true
    },
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true
    },
    video1: {
        type: String,
        required: true
    },
    video2: {
        type: String,
        required: true
    },
    winner: {
        type: String,
        enum: ["video1", "video2", null],
        default: null
    },
    isCompleted: { // Indicates whether the match has been completed
        type: Boolean,
        default: false
    }
});

const Match = mongoose.model("Match", matchSchema);

export default Match;