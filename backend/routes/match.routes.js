import express from "express"
import { protectRoute } from "../middleware/protectRoute.js";
import { createMatch, getMatchById, getMatchesByTournamentId, updateMatchWinner } from "../controllers/match.controller.js";

const router = express.Router();

//TODO CHANGE VERBOSE ENDPOINTS ROUTER
router.post("/create", protectRoute, createMatch);
router.get("/get/:id", protectRoute, getMatchById);
router.put("/set/:id", updateMatchWinner);
router.get("/tournament/:tournamentId", protectRoute, getMatchesByTournamentId);



export default router;