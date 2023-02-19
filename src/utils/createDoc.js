import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";


const createDoc = async (obj, collectionName) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), { ...obj });
  } catch (err) {
    console.log(err);
  }
};

export default createDoc