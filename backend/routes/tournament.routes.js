import express from "express"
import { protectRoute } from "../middleware/protectRoute.js";
import { createTournament, getTournament, editTournament } from "../controllers/tournament.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createTournament);
router.get("/get/:id", protectRoute, getTournament);
router.put("/edit/:id", protectRoute, editTournament);

export default router;