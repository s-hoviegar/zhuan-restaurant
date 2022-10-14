import { getAuth } from "firebase/auth";
import { app } from "./firebase-config";

// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(app);

export default firebaseAuth;
