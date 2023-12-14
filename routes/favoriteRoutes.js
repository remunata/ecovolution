import express from "express";

import { addFavorite, getAllFavorites } from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/favorites", getAllFavorites);
router.post("/favorites", addFavorite);

export default router;
