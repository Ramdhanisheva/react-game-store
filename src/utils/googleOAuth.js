import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import logger from "./logger";

const handleGoogleAuth = async (auth, loginDispatch, navigate) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    loginDispatch({ type: "login", payload: user, isRemember: true });
    navigate("/");
  } catch (error) {
    logger.debug(error);
  }
};

export default handleGoogleAuth;
