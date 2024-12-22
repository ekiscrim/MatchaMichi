import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    videos: {
        type: [String],
        required: true,
    },
    numberOfRounds: {
        type: Number,
        require: true, // it will always be calculated or proportionate to the number of videos
    },
    isRoundsSelected: {
        type: Boolean,
        default: false, // Indicates whether the number of rounds was chosen by the user
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
},  {timestamps: true}

);

const Tournament = mongoose.model("Tournament", tournamentSchema);

export default Tournament;