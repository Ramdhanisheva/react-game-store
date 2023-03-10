import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import logger from "./logger";

const createDoc = async (obj, collectionName) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), { ...obj });
  } catch (err) {
    logger.debug(err);
  }
};

export default createDoc;
