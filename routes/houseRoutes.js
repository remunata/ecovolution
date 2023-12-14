import express from "express";

import { addHouse, getAllHouses, getHousebyId } from "../controllers/houseControllers.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is ready");
});

router.get("/houses", getAllHouses);
router.post("/houses", addHouse);
router.get("/houses/:id", getHousebyId);

export default router;
