import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./firebase";
import logger from "./logger";

async function handleCredentialResponse(response, dispatch) {
    // Build Firebase credential with the Google ID token.
    const credential = GoogleAuthProvider.credential(
      null,
      response.access_token
    );
    try {
      const userCredential = await signInWithCredential(auth, credential);
      logger.debug(userCredential);
      const user = userCredential.user;
      dispatch({
        type: "login",
        payload: user,
        isRemember: true,
      });
      navigate("/");
    } catch (error) {
      logger.debug(error.code, error.message);
    }
  }

export default handleCredentialResponse;
