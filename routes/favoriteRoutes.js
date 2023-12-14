import express from "express";

import { addFavorite, getAllFavorites, getFavoritesByUserId } from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/favorites", getAllFavorites);
router.post("/favorites", addFavorite);
router.get("/favorites/:userId", getFavoritesByUserId);

export default router;
