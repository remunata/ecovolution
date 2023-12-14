import firebase from "../firebase.js";
import Favorite from "../models/favoriteModel.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const addFavorite = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.userId || !data.houseId) {
      return res.status(400).send("User Id and House Id are required");
    }

    const docRef = await addDoc(collection(db, "favorites"), {
      userId: data.userId,
      houseId: data.houseId,
    });

    res.status(200).json({
      message: "Favorite added successfully",
      favorite: {
        id: docRef.id,
        userId: data.userId,
        houseId: data.houseId,
      },
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllFavorites = async (req, res, next) => {
  try {
    const favorites = await getDocs(collection(db, "favorites"));
    const favoriteArray = [];

    if (favorites.empty) {
      res.status(400).send("No favorites found");
    } else {
      favorites.forEach((doc) => {
        const favorite = new Favorite(doc.data().userId, doc.data().houseId);
        favoriteArray.push(favorite);
      });
      res.status(200).send(favoriteArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
