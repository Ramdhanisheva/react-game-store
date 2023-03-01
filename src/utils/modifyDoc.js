import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const modifyDoc = async (obj, docCollection, docId) => {
  const docRef = doc(db, docCollection, docId);

  await updateDoc(docRef, obj);
};

export default modifyDoc;
