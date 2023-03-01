import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const eraseDoc = async (docCollection, docId) => {
  await deleteDoc(doc(db, docCollection, docId));
};

export default eraseDoc;
