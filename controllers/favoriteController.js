import firebase from "../firebase.js";
import Favorite from "../models/favoriteModel.js";
import {
  getFirestore,
  query,
  where,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  documentId,
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

export const getFavoritesByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const favorites = collection(db, "favorites");
    const userFavorites = await getDocs(query(favorites, where("userId", "==", userId)));
    const ids = [];
    userFavorites.forEach((doc) => {
      ids.push(doc.data().houseId);
    });

    const houses = collection(db, "houses");
    const userFavoriteHouses = await getDocs(query(houses, where(documentId(), "in", ids)));

    const houseArray = [];
    userFavoriteHouses.forEach((doc) => {
      const house = {
        id: doc.id,
        title: doc.data().title,
        price: doc.data().price,
        address: doc.data().address,
        imageUrl: doc.data().imageUrl,
        seller: doc.data().seller,
        email: doc.data().email,
        longtitude: doc.data().longtitude,
        latitude: doc.data().latitude,
      };
      houseArray.push(house);
    });
    res.status(200).send(houseArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
