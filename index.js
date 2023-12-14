import express from "express";
import cors from "cors";
import multer from "multer";
import houseRoutes from "./routes/houseRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

const app = express();
const port = 3000;

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multerMid.single("image"));

app.get("/", (req, res) => {
  res.send("Welcome to the ultimate-gcs-firebase API");
});

app.use("/api", houseRoutes);
app.use("/api", favoriteRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
