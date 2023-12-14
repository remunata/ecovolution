import express from "express";

import { addFavorite, getAllFavorites, getFavoritebyId } from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/favorites", getAllFavorites);
router.post("/favorites", addFavorite);
router.get("/favorites/:id", getFavoritebyId);

export default router;
