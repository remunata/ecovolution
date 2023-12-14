import firebase from "../firebase.js";
import House from "../models/houseModel.js";
import uploadImage from "../gcs.js";
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase);

export const addHouse = async (req, res, next) => {
  try {
    const image = req.file;
    const imageUrl = await uploadImage(image);

    const data = req.body;
    const docRef = await addDoc(collection(db, "houses"), {
      title: data.title,
      price: data.price,
      address: data.address,
      imageUrl: imageUrl,
      seller: data.seller,
      email: data.email,
      longtitude: data.longtitude,
      latitude: data.latitude,
    });

    res.status(200).json({
      message: "House added successfully",
      house: {
        id: docRef.id,
        title: data.title,
        price: data.price,
        address: data.address,
        imageUrl: imageUrl,
        seller: data.seller,
        email: data.email,
        longtitude: data.longtitude,
        latitude: data.latitude,
      },
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getAllHouses = async (req, res, next) => {
  try {
    const houses = await getDocs(collection(db, "houses"));
    const houseArray = [];

    if (houses.empty) {
      res.status(400).send("No houses found");
    } else {
      houses.forEach((doc) => {
        const house = new House(doc.id, doc.data().title, doc.data().price, doc.data().address, doc.data().imageUrl, doc.data().seller, doc.data().email, doc.data().longtitude, doc.data().latitude);
        houseArray.push(house);
      });
      res.status(200).send(houseArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getHousebyId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const house = doc(db, "houses", id);
    const data = await getDoc(house);
    if (data.exists()) {
      res.status(200).send(new House(data.id, data.data().title, data.data().price, data.data().address, data.data().imageUrl));
    } else {
      res.status(400).send("data not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
