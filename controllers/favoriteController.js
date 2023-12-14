import firebase from "../firebase.js";
import Favorite from "../models/favoriteModel.js";
import { getFirestore, collection, doc, addDoc, getDoc, getDocs } from "firebase/firestore";

const db = getFirestore(firebase);

export const addFavorite = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    console.log(req);
    const docRef = await addDoc(collection(db, "favorites"), {
      userId: data.userId,
      houseId: data.houseId,
    });

    if (!userId || !houseId) {
      return res.status(400).send("User Id and House Id are required");
    }

    const isAlreadyFavourite = db.some((favorite) => favorite.userId === userId && favorite.houseId === houseId);
    if (isAlreadyFavourite) {
      return res.status(400).send("House is already in favorites");
    }

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
        const favorite = new Favorite(doc.id, doc.userId, doc.houseId);
        favoriteArray.push(favorite);
      });
      res.status(400).send(favoriteArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getFavoritebyId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const favorite = doc(db, "favorites", id);
    const data = await getDoc(favorite);
    if (data.exists()) {
      res.status(200).send(new Favorite(data.id, data.data().userId, data.data().houseId));
    } else {
      res.status(400).send("Data not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
